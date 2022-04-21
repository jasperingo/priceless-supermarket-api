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
export class IsUniquePhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly customersRepository: CustomerRepository) {}

  async validate(phoneNumber: string) {
    return !(await this.customersRepository.existsByPhoneNumber(phoneNumber));
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
