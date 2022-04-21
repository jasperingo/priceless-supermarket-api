import { Expose } from 'class-transformer';
import { Allow, IsNotEmpty, IsNumber } from 'class-validator';
import { ErrorCode } from 'src/error/error-code.constants';
import { validationErrorMessage } from 'src/error/validation-error-message.function';
import { IsNotRelatedPhoto } from 'src/photo/validators/is-not-related-photo.validator';
import { IsUniqueName } from '../validators/is-unique-name.validator';

export class CreateCategoryDto {
  @Expose()
  @IsUniqueName({
    message: validationErrorMessage(
      'errors.name_exists',
      ErrorCode.NAME_EXISTS,
    ),
  })
  @IsNotEmpty({
    message: validationErrorMessage(
      'errors.field_required',
      ErrorCode.FIELD_REQUIRED,
    ),
  })
  name: string;

  @Expose()
  @Allow()
  description: string;

  @Expose({ name: 'photo_id' })
  @IsNotRelatedPhoto('category', {
    message: validationErrorMessage(
      'errors.photo_category_id_exists',
      ErrorCode.PHOTO_CATEGORY_ID_EXISTS,
      'photo_id',
    ),
  })
  @IsNumber(
    {},
    {
      message: validationErrorMessage(
        'errors.field_required',
        ErrorCode.FIELD_REQUIRED,
        'photo_id',
      ),
    },
  )
  photoId: number;
}
