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

@Module({
  controllers: [OrderController],
  providers: [OrderService, IsValidLocationPipe],
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderRepository,
      OrderItem,
      OrderItemRepository,
    ]),
    PermissionModule,
  ],
})
export class OrderModule {}
