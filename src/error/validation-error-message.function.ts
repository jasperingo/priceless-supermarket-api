import { BadRequestException, ValidationError } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ErrorCode } from './error-code.constants';

export const validationErrorMessage = (
  message: string,
  errorCode: ErrorCode,
  propertyName?: string,
) => `${message} | ${errorCode} | ${propertyName}`;

export const appValidationErrorFactory =
  (i18n: I18nService) =>
  (validationErrors: ValidationError[] = []) =>
    new BadRequestException(
      validationErrors.map((error) => {
        const [errorMessage, errorCode, propertyName] = Object.values(
          error.constraints,
        )[0].split(' | ');
        return {
          value: error.value,
          message: i18n.t(errorMessage),
          error_code: errorCode ?? ErrorCode.FIELD_INVALID,
          name:
            propertyName === 'undefined' || !propertyName
              ? error.property
              : propertyName,
        };
      }),
    );
