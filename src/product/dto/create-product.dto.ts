import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExisting as IsExistingCategory } from 'src/category/pipes/is-existing.pipe';
import { ErrorCode } from 'src/error/error-code.constants';
import {
  booleanErrorMessage,
  numberErrorMessage,
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error-message.function';
import { IsExisting as IsExistingPhoto } from 'src/photo/pipes/is-existing.pipe';
import { IsNotRelatedPhoto } from 'src/photo/validators/is-not-related-photo.validator';
import { IsUniqueBarcode } from '../pipes/is-unique-barcode.pipe';
import { IsUniqueName } from '../pipes/is-unique-name.pipe';

export class CreateProductDto {
  @IsUniqueName(
    validationErrorMessage('errors.name_exists', ErrorCode.NAME_EXISTS),
  )
  @IsNotEmpty(requiredErrorMessage())
  name: string;

  @IsNumber({}, numberErrorMessage())
  @IsNotEmpty(requiredErrorMessage())
  price: number;

  @IsNumber({}, numberErrorMessage())
  @IsNotEmpty(requiredErrorMessage())
  quantity: number;

  @IsNotEmpty(requiredErrorMessage())
  description: string;

  @IsBoolean(booleanErrorMessage())
  @IsNotEmpty(requiredErrorMessage())
  available: boolean;

  @IsUniqueBarcode(
    validationErrorMessage('errors.barcode_exists', ErrorCode.BARCODE_EXISTS),
  )
  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  barcode: string;

  @IsNumber({}, numberErrorMessage())
  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  weight: number;

  @IsNumber({}, numberErrorMessage())
  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  width: number;

  @IsNumber({}, numberErrorMessage())
  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  height: number;

  @Expose({ name: 'photo_id' })
  @IsNotRelatedPhoto(
    'product',
    validationErrorMessage(
      'errors.photo_product_id_exists',
      ErrorCode.PHOTO_PRODUCT_ID_EXISTS,
      'photo_id',
    ),
  )
  @IsExistingPhoto(
    validationErrorMessage(
      'errors.id_do_not_exist',
      ErrorCode.ID_DO_NOT_EXIST,
      'photo_id',
    ),
  )
  @IsNumber({}, numberErrorMessage('photo_id'))
  @IsNotEmpty(requiredErrorMessage('photo_id'))
  photoId: number;

  @Expose({ name: 'category_id' })
  @IsExistingCategory(
    validationErrorMessage(
      'errors.category_do_not_exist',
      ErrorCode.CATEGORY_DO_NOT_EXIST,
      'category_id',
    ),
  )
  @IsNumber({}, numberErrorMessage('category_id'))
  @IsNotEmpty(requiredErrorMessage('category_id'))
  categoryId: number;
}
