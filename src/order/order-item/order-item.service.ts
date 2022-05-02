import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';
import { Connection } from 'typeorm';
import { OrderItem, OrderItemStatus } from '../entities/order-item.entity';
import { OrderItemRepository } from '../order-item.repository';
import { OrderRepository } from '../order.repository';

@Injectable()
export class OrderItemService {
  constructor(private readonly dbConnection: Connection) {}

  updateStatus(orderItem: OrderItem, status: OrderItemStatus) {
    return this.dbConnection.transaction(async (manager) => {
      const orderRepo = manager.getCustomRepository(OrderRepository);
      const productRepo = manager.getCustomRepository(ProductRepository);
      const orderItemRepo = manager.getCustomRepository(OrderItemRepository);

      if (status === OrderItemStatus.ACCEPTED) {
        orderItem.product.quantity -= orderItem.quantity;
        await productRepo.save(orderItem.product);
      }

      if (
        status === OrderItemStatus.CANCELLED ||
        status === OrderItemStatus.DECLINED
      ) {
        orderItem.order.total -= orderItem.amount;
        await orderRepo.save(orderItem.order);
      }

      orderItem.status = status;

      return orderItemRepo.save(orderItem);
    });
  }
}
