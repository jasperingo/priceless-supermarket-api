import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CreatePermissionGuard } from './guards/create-permission.guard';

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
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }
}
