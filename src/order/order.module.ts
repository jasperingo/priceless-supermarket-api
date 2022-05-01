import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PermissionModule } from 'src/permission/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderRepository } from './order.repository';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemRepository } from './order-item.repository';
import { IsValidLocationPipe } from './pipes/is-valid-location.pipe';
import { OrderItemController } from './order-item/order-item.controller';
import { OrderItemService } from './order-item/order-item.service';
import { IsValidItemStatusPipe } from './pipes/is-valid-item-status.pipe';
import { IsNotOutOfStockPipe } from './pipes/is-not-out-of-stock.pipe';
import { ProductModule } from 'src/product/product.module';
import { IsNotOutOfStockIfAcceptedPipe } from './pipes/is-not-out-of-stock-if-accepted.pipe';

@Module({
  controllers: [OrderController, OrderItemController],
  providers: [
    OrderService,
    IsValidLocationPipe,
    OrderItemService,
    IsValidItemStatusPipe,
    IsNotOutOfStockPipe,
    IsNotOutOfStockIfAcceptedPipe,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderRepository,
      OrderItem,
      OrderItemRepository,
    ]),
    PermissionModule,
    ProductModule,
  ],
  exports: [TypeOrmModule, OrderService],
})
export class OrderModule {}
