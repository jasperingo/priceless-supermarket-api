import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ErrorCode } from 'src/error/error-code.constants';

@Injectable()
export class PhotoValidationPipe implements PipeTransform {
  constructor(private readonly i18n: I18nService) {}

  transform(value: Express.Multer.File) {
    if (!value)
      throw new BadRequestException([
        {
          name: 'photo',
          message: this.i18n.t('errors.field_required'),
          error_code: ErrorCode.FIELD_REQUIRED,
        },
      ]);

    if (value.mimetype.split('/')[0] !== 'image')
      throw new BadRequestException([
        {
          name: 'photo',
          message: this.i18n.t('errors.field_invalid'),
          error_code: ErrorCode.FIELD_INVALID,
        },
      ]);

    return value;
  }
}
