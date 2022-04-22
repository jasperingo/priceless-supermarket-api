import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Category } from 'src/category/entities/category.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { Action } from './Action.enum';
import { AppAbility, Subjects } from './subject.type';

@Injectable()
export class CustomerPermissionFactory {
  create(customer: Customer) {
    const { can, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.ReadList, Product);
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
