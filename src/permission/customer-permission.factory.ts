import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Category } from 'src/category/entities/category.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Action } from './Action.enum';
import { AppAbility, Subjects } from './subject.type';

type FlatOrder = Order & {
  'customer.id': Order['customer']['id'];
};

@Injectable()
export class CustomerPermissionFactory {
  create(customer: Customer, order?: Order) {
    const { can, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Create, Order);
    can(Action.ReadList, Product);
    can<FlatOrder>([Action.Read, Action.ReadList], Order, {
      'customer.id': customer.id,
    });
    can(Action.Update, OrderItem, ['fulfilledAt'], { order });
    can([Action.Read, Action.ReadList], Category);
    can(Action.Read, Product, { available: true });
    can(Action.Read, Customer, { id: customer.id });
    can(Action.Update, Customer, { id: customer.id });

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
