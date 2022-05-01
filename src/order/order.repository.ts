import { EntityRepository, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async existsByNumber(number: string) {
    try {
      await this.findOneOrFail({ where: { number } });
      return true;
    } catch {
      return false;
    }
  }

  getQueryBuilder() {
    return this.createQueryBuilder('order')
      .leftJoinAndSelect('order.customer', 'customer')
      .leftJoinAndSelect('order.orderItems', 'orderItems')
      .leftJoinAndSelect('orderItems.product', 'product')
      .leftJoinAndSelect('product.photo', 'photo');
  }
}
