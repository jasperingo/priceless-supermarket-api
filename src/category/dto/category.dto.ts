import { Expose, Type } from 'class-transformer';
import { PhotoDto } from 'src/photo/dto/photo.dto';

export class CategoryDto {
  id: number;

  name: string;

  description: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Type(() => PhotoDto)
  photo: PhotoDto;
}
