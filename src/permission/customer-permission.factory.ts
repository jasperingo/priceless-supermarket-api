import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customer/entities/customer.entity';
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

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
