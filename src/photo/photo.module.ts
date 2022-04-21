import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { PhotoRepository } from './photo.repository';
import { IsNotRelatedConstraint } from './validators/is-not-related-photo.validator';
import { PermissionModule } from 'src/permission/permission.module';
import { PhotoSubscriber } from './entities/photo.subscriber';
import { PhotoLocationService } from './photo-location.service';

@Module({
  controllers: [PhotoController],
  providers: [
    PhotoService,
    PhotoLocationService,
    IsNotRelatedConstraint,
    PhotoSubscriber,
  ],
  imports: [
    TypeOrmModule.forFeature([Photo, PhotoRepository]),
    MulterModule.registerAsync({
      inject: [PhotoRepository],
      imports: [TypeOrmModule.forFeature([PhotoRepository])],
      useClass: MulterConfigService,
    }),
    PermissionModule,
  ],
  exports: [TypeOrmModule],
})
export class PhotoModule {}
