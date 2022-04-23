import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCode } from 'src/error/error-code.constants';
import { OrderItemRepository } from '../order-item.repository';

@Injectable()
export class FetchItemGuard implements CanActivate {
  constructor(private orderItemRepository: OrderItemRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const orderItemId = Number(req.params.id);

    if (isNaN(orderItemId))
      throw new NotFoundException(
        'errors.id_not_number',
        ErrorCode.ID_NOT_NUMBER,
      );

    const orderItem = await this.orderItemRepository.findWithOrderById(
      orderItemId,
    );

    if (!orderItem)
      throw new NotFoundException(
        'errors.order_item_do_not_exist',
        ErrorCode.ORDER_ITEM_DO_NOT_EXIST,
      );

    req.data ? (req.data.orderItem = orderItem) : (req.data = { orderItem });

    return true;
  }
}
