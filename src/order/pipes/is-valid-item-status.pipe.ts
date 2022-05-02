import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { REQUEST_CONTEXT } from 'src/auth/inject-user.interceptor';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItem, OrderItemStatus } from '../entities/order-item.entity';

@Injectable()
@ValidatorConstraint()
export class IsValidItemStatusPipe implements ValidatorConstraintInterface {
  validate(status: string, args?: ValidationArguments) {
    const user = args.object[REQUEST_CONTEXT].user;
    const orderItem = args.object[REQUEST_CONTEXT].orderItem as OrderItem;

    if (user instanceof Customer) {
      return (
        (status === OrderItemStatus.CANCELLED &&
          orderItem.status === OrderItemStatus.PENDING) ||
        (status === OrderItemStatus.FULFILLED &&
          orderItem.status === OrderItemStatus.TRANSPORTING)
      );
    }

    if (user instanceof Administrator) {
      return (
        (status === OrderItemStatus.ACCEPTED &&
          orderItem.status === OrderItemStatus.PENDING) ||
        (status === OrderItemStatus.DECLINED &&
          orderItem.status === OrderItemStatus.PENDING) ||
        (status === OrderItemStatus.PROCESSING &&
          orderItem.status === OrderItemStatus.ACCEPTED) ||
        (status === OrderItemStatus.TRANSPORTING &&
          orderItem.status === OrderItemStatus.PROCESSING)
      );
    }

    return false;
  }
}

export function IsValidItemStatus(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidItemStatusPipe,
    });
  };
}
