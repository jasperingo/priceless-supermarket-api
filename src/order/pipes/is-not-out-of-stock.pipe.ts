import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProductRepository } from 'src/product/product.repository';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsNotOutOfStockPipe implements ValidatorConstraintInterface {
  constructor(private readonly productRepository: ProductRepository) {}

  async validate(quantity: number, args: ValidationArguments) {
    const product = await this.productRepository.findOne(
      (args.object as any).productId,
    );

    return product && product.quantity >= quantity;
  }
}

export function IsNotOutOfStock(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotOutOfStockPipe,
    });
  };
}
