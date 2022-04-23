import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ErrorCode } from 'src/error/error-code.constants';
import { OrderRepository } from '../order.repository';

@Injectable()
export class FetchGuard implements CanActivate {
  constructor(private orderRepository: OrderRepository) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const orderId = Number(req.params.id);

    if (isNaN(orderId))
      throw new NotFoundException(
        'errors.id_not_number',
        ErrorCode.ID_NOT_NUMBER,
      );

    const order = await this.orderRepository.findOne(orderId);

    if (!order)
      throw new NotFoundException(
        'errors.order_do_not_exist',
        ErrorCode.ORDER_DO_NOT_EXIST,
      );

    req.data ? (req.data.order = order) : (req.data = { order });

    return true;
  }
}
