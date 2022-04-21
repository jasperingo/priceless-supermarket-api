import { EntityRepository, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async existsByName(name: string) {
    const category = await this.findOne({ where: { name } });
    return !!category;
  }
}
