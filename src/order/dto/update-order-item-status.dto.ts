import { Allow, IsEnum, IsNotEmpty } from 'class-validator';
import { REQUEST_CONTEXT } from 'src/auth/inject-user.interceptor';
import { ErrorCode } from 'src/error/error-code.constants';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error-message.function';
import { OrderItemStatus } from '../entities/order-item.entity';
import { IsNotOutOfStockIfAccepted } from '../pipes/is-not-out-of-stock-if-accepted.pipe';
import { IsValidItemStatus } from '../pipes/is-valid-item-status.pipe';

export class UpdateOrderItemStatusDto {
  @IsNotOutOfStockIfAccepted(
    validationErrorMessage(
      'errors.product_out_of_stock',
      ErrorCode.PRODUCT_OUT_OF_STOCK,
    ),
  )
  @IsValidItemStatus(
    validationErrorMessage(
      'errors.field_not_allowed',
      ErrorCode.FIELD_NOT_ALLOWED,
    ),
  )
  @IsEnum(
    OrderItemStatus,
    validationErrorMessage(
      'errors.field_do_not_exist',
      ErrorCode.FIELD_DO_NOT_EXIST,
    ),
  )
  @IsNotEmpty(requiredErrorMessage())
  status: OrderItemStatus;

  @Allow()
  [REQUEST_CONTEXT]: any;
}
