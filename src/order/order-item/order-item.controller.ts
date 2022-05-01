import {
  Body,
  Controller,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectUserInterceptor } from 'src/auth/inject-user.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { DataParam } from 'src/utils/data-param.decorator';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { OrderItemDto } from '../dto/order-item.dto';
import { UpdateOrderItemStatusDto } from '../dto/update-order-item-status.dto';
import { OrderItem } from '../entities/order-item.entity';
import { FetchItemGuard } from '../guards/fetch-item.guard';
import { UpdateItemFulfilledAtPermissionGuard } from '../guards/update-item-fulfilled-at-permission.guard';
import { UpdateItemProcessedAtPermissionGuard } from '../guards/update-item-processed-at-permission.guard';
import { UpdateItemStatusPermissionGuard } from '../guards/update-item-status-permission.guard';
import { UpdateItemTransportedAtPermissionGuard } from '../guards/update-item-transported-at-permission.guard';
import { InjectOrderItemInterceptor } from './inject-order-item.interceptor';
import { OrderItemService } from './order-item.service';

@Controller('order-items')
export class OrderItemController {
  constructor(
    private readonly orderItemService: OrderItemService,
    private readonly modelMapperService: ModelMapperService,
  ) {}

  @Patch(':id/status')
  @UseInterceptors(InjectUserInterceptor, InjectOrderItemInterceptor)
  @UseGuards(FetchItemGuard, JwtAuthGuard, UpdateItemStatusPermissionGuard)
  async updateStatus(
    @DataParam('orderItem') orderIem: OrderItem,
    @Body() updateOrderItemDto: UpdateOrderItemStatusDto,
  ) {
    orderIem.status = updateOrderItemDto.status;
    const updatedItem = await this.orderItemService.updateStatus(orderIem);
    return AppResponseDTO.success(
      'strings.order_item_updated',
      this.modelMapperService.entityToDto(OrderItemDto, updatedItem),
    );
  }

  @Patch(':id/processed-at')
  @UseGuards(FetchItemGuard, JwtAuthGuard, UpdateItemProcessedAtPermissionGuard)
  async updateProcessed(@DataParam('orderItem') orderIem: OrderItem) {
    const updatedItem = await this.orderItemService.updateProcessed(orderIem);
    return AppResponseDTO.success(
      'strings.order_item_updated',
      this.modelMapperService.entityToDto(OrderItemDto, updatedItem),
    );
  }

  @Patch(':id/transported-at')
  @UseGuards(
    FetchItemGuard,
    JwtAuthGuard,
    UpdateItemTransportedAtPermissionGuard,
  )
  async updateTransported(@DataParam('orderItem') orderIem: OrderItem) {
    const updatedItem = await this.orderItemService.updateTransported(orderIem);
    return AppResponseDTO.success(
      'strings.order_item_updated',
      this.modelMapperService.entityToDto(OrderItemDto, updatedItem),
    );
  }

  @Patch(':id/fulfilled-at')
  @UseGuards(FetchItemGuard, JwtAuthGuard, UpdateItemFulfilledAtPermissionGuard)
  async updateFulfilled(@DataParam('orderItem') orderIem: OrderItem) {
    const updatedItem = await this.orderItemService.updateFulfilled(orderIem);
    return AppResponseDTO.success(
      'strings.order_item_updated',
      this.modelMapperService.entityToDto(OrderItemDto, updatedItem),
    );
  }
}
