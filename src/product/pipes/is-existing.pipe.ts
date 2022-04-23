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
export class IsExistingPipe implements ValidatorConstraintInterface {
  constructor(private readonly productRepository: ProductRepository) {}

  validate(id: number) {
    return this.productRepository.existsById(id);
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
