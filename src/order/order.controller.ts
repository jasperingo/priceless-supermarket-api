import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { Order } from './entities/order.entity';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { OrderDto } from './dto/order.dto';
import { User } from 'src/auth/user.decorator';
import { Customer } from 'src/customer/entities/customer.entity';
import { CreatePermissionGuard } from './guards/create-permission.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrderItem } from './entities/order-item.entity';
import { Product } from 'src/product/entities/product.entity';
import { ReadListPermissionPipe } from './guards/read-list-permission.pipe';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly modelMapperService: ModelMapperService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreatePermissionGuard)
  async create(
    @User() customer: Customer,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    const newOrder = this.modelMapperService.entityToDto(Order, createOrderDto);
    newOrder.customer = customer;
    newOrder.orderItems = createOrderDto.orderItems.map((item) => {
      const orderItem = new OrderItem();
      orderItem.quantity = item.quantity;
      orderItem.product = new Product();
      orderItem.product.id = item.productId;
      return orderItem;
    });

    const order = await this.orderService.create(newOrder);

    return AppResponseDTO.success(
      'strings.order_created',
      this.modelMapperService.entityToDto(OrderDto, order),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, ReadListPermissionPipe)
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
