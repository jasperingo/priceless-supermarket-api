import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductRepository } from '../product.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueNamePipe implements ValidatorConstraintInterface {
  constructor(private readonly productsRepository: ProductRepository) {}

  async validate(name: string) {
    return !(await this.productsRepository.existsByName(name));
  }
}

export function IsUniqueName(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueNamePipe,
    });
  };
}
