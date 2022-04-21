import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from 'src/permission/permission.module';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import { IsUniqueNamePipe } from './pipes/is-unique-name.pipe';
import { IsUniqueBarcodePipe } from './pipes/is-unique-barcode.pipe';

@Module({
  controllers: [ProductController],
  providers: [ProductService, IsUniqueNamePipe, IsUniqueBarcodePipe],
  imports: [
    TypeOrmModule.forFeature([Product, ProductRepository]),
    PermissionModule,
  ],
})
export class ProductModule {}
