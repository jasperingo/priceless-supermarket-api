import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { REQUEST_CONTEXT } from 'src/auth/inject-user.interceptor';
import { OrderItem, OrderItemStatus } from '../entities/order-item.entity';

@Injectable()
@ValidatorConstraint()
export class IsNotOutOfStockIfAcceptedPipe
  implements ValidatorConstraintInterface
{
  validate(status: OrderItemStatus, args: ValidationArguments) {
    if (status === OrderItemStatus.ACCEPTED) {
      const orderItem = args.object[REQUEST_CONTEXT].orderItem as OrderItem;
      return orderItem.product.quantity - orderItem.quantity >= 0;
    } else {
      return true;
    }
  }
}

export function IsNotOutOfStockIfAccepted(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotOutOfStockIfAcceptedPipe,
    });
  };
}
