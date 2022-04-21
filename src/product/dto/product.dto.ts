import { Expose, Type } from 'class-transformer';
import { CategoryDto } from 'src/category/dto/category.dto';
import { PhotoDto } from 'src/photo/dto/photo.dto';

export class ProductDto {
  id: number;

  name: string;

  price: number;

  quantity: number;

  description: string;

  available: boolean;

  barcode: string;

  weight: number;

  width: number;

  height: number;

  @Type(() => Date)
  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Type(() => CategoryDto)
  category: CategoryDto;

  @Type(() => PhotoDto)
  photo: PhotoDto;
}
