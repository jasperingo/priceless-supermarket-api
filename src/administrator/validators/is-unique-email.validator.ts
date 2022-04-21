import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { AdministratorRepository } from '../administrator.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(
    private readonly administratorsRepository: AdministratorRepository,
  ) {}

  async validate(emailAddress: string) {
    return !(await this.administratorsRepository.existsByEmailAddress(
      emailAddress,
    ));
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmailConstraint,
    });
  };
}
