import { Injectable } from '@nestjs/common';
import { Photo } from 'src/photo/entities/photo.entity';
import { PhotoRepository } from 'src/photo/photo.repository';
import { Connection } from 'typeorm';
import { CategoryRepository } from './category.repository';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly dbConnection: Connection,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  create(category: Category, photoId: number) {
    return this.dbConnection.transaction(async (manger) => {
      const photoRepo = manger.getCustomRepository(PhotoRepository);
      const categoryRepo = manger.getCustomRepository(CategoryRepository);

      const newCategory = await categoryRepo.save(category);

      const photo = new Photo();
      photo.id = photoId;
      photo.category = newCategory;

      await photoRepo.save(photo);

      return categoryRepo.findOne(newCategory.id);
    });
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category ${updateCategoryDto.toString()}`;
  }
}
