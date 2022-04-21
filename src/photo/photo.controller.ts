import {
  Controller,
  Get,
  Post,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Response,
  StreamableFile,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { PhotoDto } from './dto/photo.dto';
import { PhotoValidationPipe } from './pipes/photo-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Response as ExpressResponse } from 'express';
import { createReadStream } from 'fs';
import { CreatePermissionGuard } from './guards/create-permission.guard';
import { FetchBinaryGuard } from './guards/fetch-binary.guard';
import { DataParam } from 'src/utils/data-param.decorator';
import { Photo } from './entities/photo.entity';
import { FetchGuard } from './guards/fetch.guard';
import { PhotoLocationService } from './photo-location.service';
import { UpdatePermissionGuard } from './guards/update-permission.guard';

@Controller('photos')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly photoLocationService: PhotoLocationService,
    private readonly modelMapperService: ModelMapperService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, CreatePermissionGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async create(@UploadedFile(PhotoValidationPipe) photo: Express.Multer.File) {
    const newPhoto = await this.photoService.create(photo);
    return AppResponseDTO.success(
      'strings.photo_created',
      this.modelMapperService.entityToDto(PhotoDto, newPhoto),
    );
  }

  @Get(':id')
  @UseGuards(FetchGuard)
  findOne(@DataParam('photo') photo: Photo) {
    return AppResponseDTO.success(
      'strings.photo_fetched',
      this.modelMapperService.entityToDto(PhotoDto, photo),
    );
  }

  @Get('i/:name')
  @UseGuards(FetchBinaryGuard)
  findOneBinary(
    @DataParam('photo') photo: Photo,
    @Response({ passthrough: true }) res: ExpressResponse,
  ) {
    const file = createReadStream(this.photoLocationService.path(photo));

    res.set({
      'Content-Type': photo.mimeType,
      'Content-Disposition': `attachment; filename="${photo.name}"`,
    });

    return new StreamableFile(file);
  }

  @Patch(':id')
  @UseGuards(FetchGuard, JwtAuthGuard, UpdatePermissionGuard)
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @DataParam('photo') photo: Photo,
    @UploadedFile(PhotoValidationPipe) uploadedPhoto: Express.Multer.File,
  ) {
    const updatedPhoto = await this.photoService.update(photo, uploadedPhoto);

    return AppResponseDTO.success(
      'strings.photo_updated',
      this.modelMapperService.entityToDto(PhotoDto, updatedPhoto),
    );
  }
}
