import * as sizeOf from 'image-size';
import { unlink } from 'fs';
import { promisify } from 'util';
import { Injectable } from '@nestjs/common';
import { PhotoRepository } from './photo.repository';
import { Photo } from './entities/photo.entity';
import { PhotoLocationService } from './photo-location.service';

@Injectable()
export class PhotoService {
  constructor(
    private readonly photoRepository: PhotoRepository,
    private readonly photoLocationService: PhotoLocationService,
  ) {}

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

  findOne(id: number) {
    return this.photoRepository.findOne(id);
  }

  async update(photo: Photo, uploaded: Express.Multer.File) {
    const oldPath = this.photoLocationService.path(photo);
    const dimensions = await this.getDimensions(uploaded);
    photo.name = uploaded.filename;
    photo.mimeType = uploaded.mimetype;
    photo.size = uploaded.size;
    photo.width = dimensions.width;
    photo.height = dimensions.height;
    await this.photoRepository.save(photo);
    await promisify(unlink)(oldPath);
    return this.photoRepository.findOne(photo.id);
  }
}
