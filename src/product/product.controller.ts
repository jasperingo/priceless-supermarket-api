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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePermissionGuard } from './guards/create-permission.guard';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { Product } from './entities/product.entity';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { ProductDto } from './dto/product.dto';

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
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
