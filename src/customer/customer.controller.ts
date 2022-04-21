import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { DataParam } from 'src/utils/data-param.decorator';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerDto } from './dto/customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { FetchGuard } from './guards/fetch.guard';
import { ReadListPermissionGuard } from './guards/read-list-permission.guard';
import { ReadPermissionGuard } from './guards/read-permission.guard';
import { UpdatePermissionGuard } from './guards/update-permission.guard';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly modelMapperService: ModelMapperService,
  ) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerService.create(
      this.modelMapperService.entityToDto(Customer, createCustomerDto),
    );
    return AppResponseDTO.success(
      'strings.customer_created',
      this.modelMapperService.entityToDto(CustomerDto, customer),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard, ReadListPermissionGuard)
  async findAll() {
    const customers = await this.customerService.findAll();
    return AppResponseDTO.success(
      'strings.customers_fetched',
      this.modelMapperService.entityToDto(CustomerDto, customers),
    );
  }

  @Get(':id')
  @UseGuards(FetchGuard, JwtAuthGuard, ReadPermissionGuard)
  findOne(@DataParam('customer') customer: Customer) {
    return AppResponseDTO.success(
      'strings.customer_fetched',
      this.modelMapperService.entityToDto(CustomerDto, customer),
    );
  }

  @Patch(':id')
  @UseGuards(FetchGuard, JwtAuthGuard, UpdatePermissionGuard)
  async update(
    @DataParam('customer') customer: Customer,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const updatedCustomer = await this.customerService.update(
      customer,
      updateCustomerDto,
    );

    return AppResponseDTO.success(
      'strings.customer_updated',
      this.modelMapperService.entityToDto(CustomerDto, updatedCustomer),
    );
  }
}
