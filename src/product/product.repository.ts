import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async existsByName(name: string) {
    try {
      await this.findOneOrFail({ select: ['id'], where: { name } });
      return true;
    } catch {
      return false;
    }
  }

  async existsByBarcode(barcode: string) {
    try {
      await this.findOneOrFail({ select: ['id'], where: { barcode } });
      return true;
    } catch {
      return false;
    }
  }
}
