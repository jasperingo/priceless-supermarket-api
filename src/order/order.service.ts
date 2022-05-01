import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customer/entities/customer.entity';
import { ProductRepository } from 'src/product/product.repository';
import { PaginationService } from 'src/utils/pagination/pagination.service';
import { StringGeneratorService } from 'src/utils/string-generator/string-generator.service';
import { Connection } from 'typeorm';
import { OrderItemStatus } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrderItemRepository } from './order-item.repository';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly dbConnection: Connection,
    private readonly orderRepository: OrderRepository,
    private readonly paginationService: PaginationService,
    private readonly stringGeneratorService: StringGeneratorService,
  ) {}

  create(createOrder: Order) {
    return this.dbConnection.transaction(async (manager) => {
      const orderRepo = manager.getCustomRepository(OrderRepository);
      const productRepo = manager.getCustomRepository(ProductRepository);
      const orderItemRepo = manager.getCustomRepository(OrderItemRepository);

      createOrder.number = await this.stringGeneratorService
        .setExists(orderRepo.existsByNumber.bind(orderRepo))
        .generate(Order.NUMBER_LENGTH);

      createOrder.orderItems = await Promise.all(
        createOrder.orderItems.map(async (item) => {
          const product = await productRepo.findOne(item.product.id);
          item.amount = Number((item.quantity * product.price).toFixed(2));
          return item;
        }),
      );

      createOrder.total = createOrder.orderItems.reduce(
        (accu, item) => accu + item.amount,
        0,
      );

      const order = await orderRepo.save(createOrder);

      await orderItemRepo.save(
        createOrder.orderItems.map((item) => {
          item.order = order;
          item.status = OrderItemStatus.PENDING;
          return item;
        }),
      );

      return orderRepo.findOne(order.id);
    });
  }

  findAll() {
    return this.paginationService
      .paginateQuery('order.id', this.orderRepository.getQueryBuilder())
      .orderBy('order.createdAt', 'DESC')
      .getMany();
  }

  findAllByCustomer(customer: Customer) {
    const qb = this.orderRepository.getQueryBuilder();
    qb.where('customer.id = :id', { id: customer.id });

    return this.paginationService
      .paginateQuery('order.id', qb, false)
      .orderBy('order.createdAt', 'DESC')
      .getMany();
  }

  findOne(id: number) {
    return this.orderRepository.findOne(id);
  }
}
