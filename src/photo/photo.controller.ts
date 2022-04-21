import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ModelMapperService } from 'src/utils/model-mapper/model-mapper.service';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { PhotoDto } from './dto/photo.dto';
import { PhotoValidationPipe } from './pipes/photo-validation.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('photos')
export class PhotoController {
  constructor(
    private readonly photoService: PhotoService,
    private readonly modelMapperService: ModelMapperService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
  findOne(@Param('id') id: string) {
    return this.photoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.photoService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}
