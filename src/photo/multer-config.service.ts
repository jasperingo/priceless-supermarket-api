import * as path from 'path';
import { diskStorage } from 'multer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { PhotoRepository } from './photo.repository';
import { StringGeneratorService } from 'src/utils/string-generator/string-generator.service';
import { ErrorCode } from 'src/error/error-code.constants';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(
    private readonly photoRepostory: PhotoRepository,
    private readonly stringGeneratorService: StringGeneratorService,
  ) {}

  async makeName(fileName: string) {
    const ext = path.extname(fileName);
    const name = await this.stringGeneratorService
      .setExists((name) => this.photoRepostory.existsByName(`${name}${ext}`))
      .generate(20);

    if (name === undefined)
      throw new InternalServerErrorException(
        'errors.photo_name_generation_failed',
        ErrorCode.PHOTO_NAME_GENERATION_FAILED,
      );

    return `${name}${ext}`;
  }

  async createMulterOptions(): Promise<MulterModuleOptions> {
    return {
      storage: diskStorage({
        filename: async (req, file, cb) => {
          try {
            cb(null, await this.makeName(file.originalname));
          } catch (error) {
            cb(error, null);
          }
        },
        destination: (req, file, cb) => {
          cb(null, './upload');
        },
      }),
    };
  }
}
