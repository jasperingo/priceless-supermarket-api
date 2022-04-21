import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PermissionModule } from 'src/permission/permission.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { IsUniqueNameConstraint } from './validators/is-unique-name.validator';
import { IsExistingPipe } from './pipes/is-existing.pipe';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, IsUniqueNameConstraint, IsExistingPipe],
  imports: [
    TypeOrmModule.forFeature([Category, CategoryRepository]),
    PermissionModule,
  ],
})
export class CategoryModule {}
