import { Ability, InferSubjects } from '@casl/ability';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Category } from 'src/category/entities/category.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Photo } from 'src/photo/entities/photo.entity';
import { Action } from './Action.enum';

export type Subjects =
  | InferSubjects<
      typeof Customer | typeof Administrator | typeof Category | typeof Photo
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;
