import { Expose, Type } from 'class-transformer';
import { CustomerDto } from 'src/customer/dto/customer.dto';
import { OrderItemDto } from './order-item.dto';

export class OrderDto {
  id: number;

  number: string;

  total: number;

  @Expose({ name: 'delivery_address_street' })
  deliveryAddressStreet: string;

  @Expose({ name: 'delivery_address_city' })
  deliveryAddressCity: string;

  @Expose({ name: 'delivery_address_state' })
  deliveryAddressState: string;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Type(() => CustomerDto)
  customer: CustomerDto;

  @Type(() => OrderItemDto)
  @Expose({ name: 'order_items' })
  orderItems: OrderItemDto[];
}
