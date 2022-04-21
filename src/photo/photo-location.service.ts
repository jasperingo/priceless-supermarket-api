import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotoLocationService {
  static readonly DIRECTORY = 'upload';

  constructor(private readonly configService: ConfigService) {}

  url(photo: Photo) {
    return `${this.configService.get('APP_URL')}photos/i/${photo.name}`;
  }

  path(photo: Photo) {
    return join(process.cwd(), PhotoLocationService.DIRECTORY, photo.name);
  }
}
