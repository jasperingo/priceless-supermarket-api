import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
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
import { join } from 'path';
import { CreatePermissionGuard } from './guards/create-permission.guard';
import { FetchBinaryGuard } from './guards/fetch-binary.guard';
import { DataParam } from 'src/utils/data-param.decorator';
import { Photo } from './entities/photo.entity';
import { FetchGuard } from './guards/fetch.guard';

@Controller('photos')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
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

  @Get()
  findAll() {
    return this.photoService.findAll();
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
    const file = createReadStream(join(process.cwd(), 'upload', photo.name));
    res.set({
      'Content-Type': photo.mimeType,
      'Content-Disposition': `attachment; filename="${photo.name}"`,
    });
    return new StreamableFile(file);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.photoService.update(+id);
  }
}
