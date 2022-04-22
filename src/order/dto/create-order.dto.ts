import { Expose, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { ErrorCode } from 'src/error/error-code.constants';
import {
  numberErrorMessage,
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error-message.function';

export class CreateOrderItemDto {
  @Expose()
  @IsNumber({}, numberErrorMessage())
  @IsNotEmpty(requiredErrorMessage())
  quantity: number;

  @Expose({ name: 'product_id' })
  @IsNumber({}, numberErrorMessage())
  @IsNotEmpty(requiredErrorMessage('product_id'))
  productId: number;
}

export class CreateOrderDto {
  @Expose({ name: 'delivery_address_city' })
  @IsNotEmpty(requiredErrorMessage('delivery_address_city'))
  deliveryAddressCity: string;

  @Expose({ name: 'delivery_address_state' })
  @IsNotEmpty(requiredErrorMessage('delivery_address_state'))
  deliveryAddressState: string;

  @Type(() => CreateOrderItemDto)
  @Expose({ name: 'order_items' })
  @ValidateNested({ each: true })
  @ArrayMinSize(
    1,
    validationErrorMessage(
      'errors.field_min_length',
      ErrorCode.FIELD_MIN_LENGTH,
      'order_items',
    ),
  )
  @IsArray(
    validationErrorMessage(
      'errors.field_not_array',
      ErrorCode.FIELD_NOT_ARRAY,
      'order_items',
    ),
  )
  @IsNotEmpty(requiredErrorMessage('order_items'))
  orderItems: CreateOrderItemDto[];
}
