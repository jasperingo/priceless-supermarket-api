import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductRepository } from '../product.repository';

@Injectable()
export class IsUniqueBarcodePipe implements ValidatorConstraintInterface {
  constructor(private readonly productsRepository: ProductRepository) {}

  async validate(barcode: string) {
    return !(await this.productsRepository.existsByBarcode(barcode));
  }
}

export function IsUniqueBarcode(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueBarcodePipe,
    });
  };
}
