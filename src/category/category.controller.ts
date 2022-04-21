import { Controller, Get, Post, Body, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { DataParam } from 'src/utils/data-param.decorator';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CreatePermissionGuard } from './guards/create-permission.guard';
import { FetchGuard } from './guards/fetch.guard';
import { UpdatePermissionGuard } from './guards/update-permission.guard';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly modelMapperService: ModelMapperService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreatePermissionGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(
      this.modelMapperService.entityToDto(Category, createCategoryDto),
      createCategoryDto.photoId,
    );

    return AppResponseDTO.success(
      'strings.category_created',
      this.modelMapperService.entityToDto(CategoryDto, category),
    );
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return AppResponseDTO.success(
      'strings.categories_fetched',
      this.modelMapperService.entityToDto(CategoryDto, categories),
    );
  }

  @Get(':id')
  @UseGuards(FetchGuard)
  findOne(@DataParam('category') category: Category) {
    return AppResponseDTO.success(
      'strings.category_fetched',
      this.modelMapperService.entityToDto(CategoryDto, category),
    );
  }

  @Patch(':id')
  @UseGuards(FetchGuard, JwtAuthGuard, UpdatePermissionGuard)
  async update(
    @DataParam('category') category: Category,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const updatedCategory = await this.categoryService.update(
      category,
      updateCategoryDto,
    );

    return AppResponseDTO.success(
      'strings.category_updated',
      this.modelMapperService.entityToDto(CategoryDto, updatedCategory),
    );
  }
}
