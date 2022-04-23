import { Ability, InferSubjects } from '@casl/ability';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Category } from 'src/category/entities/category.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { OrderItem } from 'src/order/entities/order-item.entity';
import { Order } from 'src/order/entities/order.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { Product } from 'src/product/entities/product.entity';
import { Action } from './Action.enum';

export type Subjects =
  | InferSubjects<
      | typeof Customer
      | typeof Administrator
      | typeof Category
      | typeof Photo
      | typeof Product
      | typeof Order
      | typeof OrderItem
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;
