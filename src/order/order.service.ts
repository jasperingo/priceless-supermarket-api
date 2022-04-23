import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/product/product.repository';
import { StringGeneratorService } from 'src/utils/string-generator/string-generator.service';
import { Connection } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderItemRepository } from './order-item.repository';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly dbConnection: Connection,
    private readonly orderRepository: OrderRepository,
    private readonly stringGeneratorService: StringGeneratorService,
  ) {}

  create(createOrder: Order) {
    return this.dbConnection.transaction(async (manger) => {
      const orderRepo = manger.getCustomRepository(OrderRepository);
      const productRepo = manger.getCustomRepository(ProductRepository);
      const orderItemRepo = manger.getCustomRepository(OrderItemRepository);

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
          return item;
        }),
      );

      return orderRepo.findOne(order.id);
    });
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order ${updateOrderDto.toString()}`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
