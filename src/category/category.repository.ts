import { EntityRepository, Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async existsById(id: number) {
    try {
      await this.findOneOrFail(id, { select: ['id'] });
      return true;
    } catch {
      return false;
    }
  }

  async existsByName(name: string) {
    const category = await this.findOne({ where: { name } });
    return !!category;
  }
}
