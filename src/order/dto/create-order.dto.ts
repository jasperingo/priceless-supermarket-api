import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateOrderItemDto {
  @Expose()
  @IsNotEmpty()
  quanity: number;

  @Expose({ name: 'product_id' })
  @IsNotEmpty()
  productId: number;
}

export class CreateOrderDto {
  @Expose({ name: 'delivery_address_city' })
  @IsNotEmpty()
  deliveryAddressCity: string;

  @Expose({ name: 'delivery_address_state' })
  @IsNotEmpty()
  deliveryAddressState: string;

  @Type(() => CreateOrderItemDto)
  @Expose({ name: 'order_items' })
  @ValidateNested()
  @IsArray()
  orderItems: CreateOrderItemDto[];
}
