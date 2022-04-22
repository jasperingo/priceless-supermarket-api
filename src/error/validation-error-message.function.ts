import { BadRequestException, ValidationError } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ErrorCode } from './error-code.constants';

export const validationErrorMessage = (
  message: string,
  errorCode: ErrorCode,
  propertyName?: string,
) => ({
  message,
  context: {
    errorCode,
    propertyName,
  },
});

export const requiredErrorMessage = (propertyName?: string) =>
  validationErrorMessage(
    'errors.field_required',
    ErrorCode.FIELD_REQUIRED,
    propertyName,
  );

export const numberErrorMessage = (propertyName?: string) =>
  validationErrorMessage(
    'errors.field_not_number',
    ErrorCode.FIELD_NOT_NUMBER,
    propertyName,
  );

export const booleanErrorMessage = (propertyName?: string) =>
  validationErrorMessage(
    'errors.barcode_exists',
    ErrorCode.BARCODE_EXISTS,
    propertyName,
  );

const errorMapper = (i18n: I18nService, error: ValidationError) => {
  const context = error.contexts ? Object.values(error.contexts)[0] : null;
  const errorMessage = error.constraints
    ? Object.values(error.constraints)[0]
    : null;

  return {
    value: error.value,
    message: errorMessage && i18n.t(errorMessage),
    error_code: context?.errorCode ?? ErrorCode.FIELD_INVALID,
    name: context?.propertyName ?? error.property,
    errors: error.children?.map((error) => errorMapper(i18n, error)),
  };
};

export const appValidationErrorFactory =
  (i18n: I18nService) =>
  (validationErrors: ValidationError[] = []) => {
    console.log(validationErrors);
    return new BadRequestException(
      validationErrors.map((error) => errorMapper(i18n, error)),
    );
  };
