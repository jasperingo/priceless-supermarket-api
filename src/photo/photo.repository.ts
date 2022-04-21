import { EntityRepository, Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  async existsById(id: number) {
    try {
      await this.findOneOrFail(id);
      return true;
    } catch {
      return false;
    }
  }

  async existsByName(name: string) {
    const photo = await this.findOne({ where: { name } });
    return !!photo;
  }

  findOneByName(name: string) {
    return this.findOne({ where: { name } });
  }
}
