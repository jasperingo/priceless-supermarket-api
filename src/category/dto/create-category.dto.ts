import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ErrorCode } from 'src/error/error-code.constants';
import {
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error-message.function';
import { IsExisting } from 'src/photo/pipes/is-existing.pipe';
import { IsNotRelatedPhoto } from 'src/photo/validators/is-not-related-photo.validator';
import { IsUniqueName } from '../validators/is-unique-name.validator';

export class CreateCategoryDto {
  @Expose()
  @IsUniqueName(
    validationErrorMessage('errors.name_exists', ErrorCode.NAME_EXISTS),
  )
  @IsNotEmpty(requiredErrorMessage())
  name: string;

  @Expose()
  @IsNotEmpty(requiredErrorMessage())
  @IsOptional()
  description: string;

  @Expose({ name: 'photo_id' })
  @IsNotRelatedPhoto(
    'category',
    validationErrorMessage(
      'errors.photo_category_id_exists',
      ErrorCode.PHOTO_CATEGORY_ID_EXISTS,
      'photo_id',
    ),
  )
  @IsExisting(
    validationErrorMessage(
      'errors.id_do_not_exist',
      ErrorCode.ID_DO_NOT_EXIST,
      'photo_id',
    ),
  )
  @IsNumber(
    {},
    validationErrorMessage(
      'errors.field_not_number',
      ErrorCode.FIELD_NOT_NUMBER,
      'photo_id',
    ),
  )
  @IsNotEmpty(requiredErrorMessage('photo_id'))
  photoId: number;
}
