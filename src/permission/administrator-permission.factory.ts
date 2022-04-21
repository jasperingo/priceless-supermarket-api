import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import {
  Administrator,
  AdministratorType,
} from 'src/administrator/entities/administrator.entity';
import { Category } from 'src/category/entities/category.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { Action } from './Action.enum';
import { AppAbility, Subjects } from './subject.type';

@Injectable()
export class AdministratorPermissionFactory {
  create(administrator: Administrator) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(
      Ability as AbilityClass<AppAbility>,
    );

    can(Action.Manage, Photo);
    can(Action.Manage, Category);

    can(Action.Update, Customer, ['status']);
    can([Action.Read, Action.ReadList], Customer);

    if (administrator.type === AdministratorType.ASSISTANT) {
      can(Action.Manage, Administrator, { id: administrator.id });
      cannot(Action.ReadList, Administrator);
    } else if (administrator.type === AdministratorType.SUPER) {
      can(Action.Manage, Administrator);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}