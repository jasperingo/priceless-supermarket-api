import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePermissionGuard } from './guards/create-permission.guard';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { Product } from './entities/product.entity';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { ProductDto } from './dto/product.dto';
import { FetchGuard } from './guards/fetch.guard';
import { OptionalJwtAuthGuard } from 'src/auth/optional-jwt-auth.guard';
import { DataParam } from 'src/utils/data-param.decorator';
import { UpdatePermissionGuard } from './guards/update-permission.guard';
import { SearchProductDto } from './dto/search-product.dto';
import { ReadPermissionGuard } from './guards/read-permission.guard';
import { User } from 'src/auth/user.decorator';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly modelMapperService: ModelMapperService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreatePermissionGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(
      this.modelMapperService.entityToDto(Product, createProductDto),
      createProductDto.photoId,
      createProductDto.categoryId,
    );

    return AppResponseDTO.success(
      'strings.product_created',
      this.modelMapperService.entityToDto(ProductDto, product),
    );
  }

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  async findAll(@User() user: Customer | Administrator) {
    const products = await this.productService.findAll(user);
    return AppResponseDTO.success(
      'strings.products_fetched',
      this.modelMapperService.entityToDto(ProductDto, products),
    );
  }

  @Get('search')
  @UseGuards(OptionalJwtAuthGuard)
  async search(
    @Query() search: SearchProductDto,
    @User() user: Customer | Administrator,
  ) {
    const products = await this.productService.search(search, user);
    return AppResponseDTO.success(
      'strings.products_fetched',
      this.modelMapperService.entityToDto(ProductDto, products),
    );
  }

  @Get(':id')
  @UseGuards(FetchGuard, OptionalJwtAuthGuard, ReadPermissionGuard)
  findOne(@DataParam('product') product: Product) {
    return AppResponseDTO.success(
      'strings.product_fetched',
      this.modelMapperService.entityToDto(ProductDto, product),
    );
  }

  @Patch(':id')
  @UseGuards(FetchGuard, JwtAuthGuard, UpdatePermissionGuard)
  async update(
    @DataParam('product') product: Product,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updatedProduct = await this.productService.update(
      product,
      updateProductDto,
    );

    return AppResponseDTO.success(
      'strings.product_updated',
      this.modelMapperService.entityToDto(ProductDto, updatedProduct),
    );
  }
}
