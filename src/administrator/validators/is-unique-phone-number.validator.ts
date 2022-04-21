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
export class IsUniquePhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly administratorsRepository: AdministratorRepository,
  ) {}

  async validate(phoneNumber: string) {
    return !(await this.administratorsRepository.existsByPhoneNumber(
      phoneNumber,
    ));
  }
}

export function IsUniquePhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniquePhoneNumberConstraint,
    });
  };
}
