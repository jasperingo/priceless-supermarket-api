import { Exclude, Expose, Type } from 'class-transformer';
import {
  AdministratorStatus,
  AdministratorType,
} from '../entities/administrator.entity';

export class AdministratorDto {
  id: number;

  number: string;

  @Expose({ name: 'first_name' })
  firstName: string;

  @Expose({ name: 'last_name' })
  lastName: string;

  @Expose({ name: 'email_address' })
  emailAddress: string;

  @Expose({ name: 'phone_number' })
  phoneNumber: string;

  @Exclude()
  password: string;

  type: AdministratorType;

  status: AdministratorStatus;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt: Date;
}
