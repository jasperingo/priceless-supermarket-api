import { Exclude, Expose, Type } from 'class-transformer';
import { CustomerStatus } from 'src/customer/entities/customer.entity';

export class CustomerDto {
  id: number;

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

  status: CustomerStatus;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt: Date;
}
