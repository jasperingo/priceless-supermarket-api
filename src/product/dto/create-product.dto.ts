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
  @IsUniqueName({
    message: validationErrorMessage(
      'errors.name_exists',
      ErrorCode.NAME_EXISTS,
    ),
  })
  @IsNotEmpty({ message: requiredErrorMessage() })
  name: string;

  @IsNumber({}, { message: numberErrorMessage() })
  @IsNotEmpty({ message: requiredErrorMessage() })
  price: number;

  @IsNumber({}, { message: numberErrorMessage() })
  @IsNotEmpty({ message: requiredErrorMessage() })
  quantity: number;

  @IsNotEmpty({ message: requiredErrorMessage() })
  description: string;

  @IsBoolean({ message: booleanErrorMessage() })
  @IsNotEmpty({ message: requiredErrorMessage() })
  available: boolean;

  @IsUniqueBarcode({
    message: validationErrorMessage(
      'errors.barcode_exists',
      ErrorCode.BARCODE_EXISTS,
    ),
  })
  @IsNotEmpty({ message: requiredErrorMessage() })
  @IsOptional()
  barcode: string;

  @IsNumber({}, { message: numberErrorMessage() })
  @IsNotEmpty({ message: requiredErrorMessage() })
  @IsOptional()
  weight: number;

  @IsNumber({}, { message: numberErrorMessage() })
  @IsNotEmpty({ message: requiredErrorMessage() })
  @IsOptional()
  width: number;

  @IsNumber({}, { message: numberErrorMessage() })
  @IsNotEmpty({ message: requiredErrorMessage() })
  @IsOptional()
  height: number;

  @Expose({ name: 'photo_id' })
  @IsNotRelatedPhoto('product', {
    message: validationErrorMessage(
      'errors.photo_product_id_exists',
      ErrorCode.PHOTO_PRODUCT_ID_EXISTS,
      'photo_id',
    ),
  })
  @IsExistingPhoto({
    message: validationErrorMessage(
      'errors.id_do_not_exist',
      ErrorCode.ID_DO_NOT_EXIST,
      'photo_id',
    ),
  })
  @IsNumber({}, { message: numberErrorMessage('photo_id') })
  @IsNotEmpty({ message: requiredErrorMessage('photo_id') })
  photoId: number;

  @Expose({ name: 'category_id' })
  @IsExistingCategory({
    message: validationErrorMessage(
      'errors.category_do_not_exist',
      ErrorCode.CATEGORY_DO_NOT_EXIST,
      'category_id',
    ),
  })
  @IsNumber({}, { message: numberErrorMessage('category_id') })
  @IsNotEmpty({ message: requiredErrorMessage('category_id') })
  categoryId: number;
}
