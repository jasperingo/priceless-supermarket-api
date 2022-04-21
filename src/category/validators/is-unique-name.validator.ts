import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CategoryRepository } from '../category.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueNameConstraint implements ValidatorConstraintInterface {
  constructor(private readonly categoriesRepository: CategoryRepository) {}

  async validate(name: string) {
    return !(await this.categoriesRepository.existsByName(name));
  }
}

export function IsUniqueName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueNameConstraint,
    });
  };
}
