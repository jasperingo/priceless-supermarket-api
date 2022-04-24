import { BadRequestException, Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ErrorCode } from 'src/error/error-code.constants';
import { ProductRepository } from 'src/product/product.repository';
import { Connection } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemRepository } from '../order-item.repository';

@Injectable()
export class OrderItemService {
  request = { user: new Date() };
  constructor(
    private readonly i18nService: I18nService,
    private readonly dbConnection: Connection,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  updateStatus(orderItem: OrderItem) {
    return this.dbConnection.transaction(async (manager) => {
      const productRepo = manager.getCustomRepository(ProductRepository);
      const orderItemRepo = manager.getCustomRepository(OrderItemRepository);

      orderItem.product.quantity -= orderItem.quantity;

      if (orderItem.product.quantity < 0)
        throw new BadRequestException([
          {
            value: orderItem.status,
            message: this.i18nService.t('errors.product_out_of_stock'),
            error_code: ErrorCode.PRODUCT_OUT_OF_STOCK,
            name: 'status',
            errors: [],
          },
        ]);

      await productRepo.save(orderItem.product);

      return orderItemRepo.save(orderItem);
    });
  }

  updateProcessed(orderItem: OrderItem) {
    orderItem.processedAt = new Date();
    return this.orderItemRepository.save(orderItem);
  }

  updateTransported(orderItem: OrderItem) {
    orderItem.transportedAt = new Date();
    return this.orderItemRepository.save(orderItem);
  }

  updateFulfilled(orderItem: OrderItem) {
    orderItem.fulfilledAt = new Date();
    return this.orderItemRepository.save(orderItem);
  }
}
