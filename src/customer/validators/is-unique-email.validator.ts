import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CustomerRepository } from '../customer.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(private readonly customersRepository: CustomerRepository) {}

  async validate(emailAddress: string) {
    return !(await this.customersRepository.existsByEmailAddress(emailAddress));
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
