import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
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
import { ReadListPermissionGuard } from './guards/read-list-permission.guard';
import { ReadPermissionGuard } from './guards/read-permission.guard';
import { FetchGuard } from './guards/fetch.guard';
import { DataParam } from 'src/utils/data-param.decorator';

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
  @UseGuards(JwtAuthGuard, ReadListPermissionGuard)
  async findAll() {
    const orders = await this.orderService.findAll();
    return AppResponseDTO.success(
      'strings.orders_fetched',
      this.modelMapperService.entityToDto(OrderDto, orders),
    );
  }

  @Get(':id')
  @UseGuards(FetchGuard, JwtAuthGuard, ReadPermissionGuard)
  findOne(@DataParam('order') order: Order) {
    return AppResponseDTO.success(
      'strings.order_fetched',
      this.modelMapperService.entityToDto(OrderDto, order),
    );
  }
}
