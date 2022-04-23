import { EntityRepository, Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';

@EntityRepository(OrderItem)
export class OrderItemRepository extends Repository<OrderItem> {
  findWithOrderById(id: number) {
    return this.createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.order', 'order')
      .leftJoinAndSelect('orderItem.product', 'product')
      .leftJoinAndSelect('product.photo', 'photo')
      .leftJoinAndSelect('order.customer', 'customer')
      .where('orderItem.id = :id', { id })
      .getOne();
  }
}
