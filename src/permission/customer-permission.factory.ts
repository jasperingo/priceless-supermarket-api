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

    can(Action.Read, Customer, { id: customer.id });
    can(Action.Update, Customer, { id: customer.id });
    can([Action.Read, Action.ReadList], [Product, Category]);

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
