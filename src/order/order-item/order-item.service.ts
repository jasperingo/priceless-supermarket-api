import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';
import { Connection } from 'typeorm';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemRepository } from '../order-item.repository';

@Injectable()
export class OrderItemService {
  request = { user: new Date() };
  constructor(
    private readonly dbConnection: Connection,
    private readonly orderItemRepository: OrderItemRepository,
  ) {}

  updateStatus(orderItem: OrderItem) {
    return this.orderItemRepository.save(orderItem);
  }

  updateProcessed(orderItem: OrderItem) {
    return this.dbConnection.transaction(async (manager) => {
      const productRepo = manager.getCustomRepository(ProductRepository);
      const orderItemRepo = manager.getCustomRepository(OrderItemRepository);

      orderItem.product.quantity--;

      await productRepo.save(orderItem.product);

      orderItem.processedAt = new Date();

      return orderItemRepo.save(orderItem);
    });
  }
}
