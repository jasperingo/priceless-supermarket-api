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
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }

  update(category: Category, updateCategoryDto: UpdateCategoryDto) {
    Object.keys(updateCategoryDto).forEach(
      (prop) => (category[prop] = updateCategoryDto[prop] ?? category[prop]),
    );

    return this.categoryRepository.save(category);
  }
}
