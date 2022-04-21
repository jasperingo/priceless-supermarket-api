import * as sizeOf from 'image-size';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import { PhotoRepository } from './photo.repository';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoService {
  constructor(private readonly photoRepository: PhotoRepository) {}

  getDimensions(photo: Express.Multer.File) {
    return promisify(sizeOf.imageSize)(photo.path);
  }

  async create(photo: Express.Multer.File) {
    const dimensions = await this.getDimensions(photo);
    const newPhoto = new Photo();
    newPhoto.name = photo.filename;
    newPhoto.mimeType = photo.mimetype;
    newPhoto.size = photo.size;
    newPhoto.width = dimensions.width;
    newPhoto.height = dimensions.height;
    return this.photoRepository.save(newPhoto);
  }

  findAll() {
    return `This action returns all photo`;
  }

  findOne(id: number) {
    return this.photoRepository.findOne(id);
  }

  update(id: number) {
    return `This action updates a #${id} photo`;
  }
}
