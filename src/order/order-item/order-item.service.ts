import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';
import { Connection } from 'typeorm';
import { OrderItem, OrderItemStatus } from '../entities/order-item.entity';
import { OrderItemRepository } from '../order-item.repository';
import { OrderRepository } from '../order.repository';

@Injectable()
export class OrderItemService {
  constructor(
    private readonly dbConnection: Connection,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  updateStatus(orderItem: OrderItem) {
    return this.dbConnection.transaction(async (manager) => {
      const orderRepo = manager.getCustomRepository(OrderRepository);
      const productRepo = manager.getCustomRepository(ProductRepository);
      const orderItemRepo = manager.getCustomRepository(OrderItemRepository);

      if (orderItem.status === OrderItemStatus.ACCEPTED) {
        orderItem.product.quantity -= orderItem.quantity;
        await productRepo.save(orderItem.product);
      }

      if (
        orderItem.status === OrderItemStatus.CANCELLED ||
        orderItem.status === OrderItemStatus.DECLINED
      ) {
        orderItem.order.total -= orderItem.amount;
        await orderRepo.save(orderItem.order);
      }

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
