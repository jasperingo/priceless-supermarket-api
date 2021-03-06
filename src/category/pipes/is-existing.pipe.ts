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
export class IsExistingPipe implements ValidatorConstraintInterface {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  validate(id: number) {
    return this.categoryRepository.existsById(id);
  }
}

export function IsExisting(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsExistingPipe,
    });
  };
}
