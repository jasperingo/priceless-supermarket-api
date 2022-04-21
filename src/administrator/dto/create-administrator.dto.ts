import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { ErrorCode } from 'src/error/error-code.constants';
import { validationErrorMessage } from 'src/error/validation-error-message.function';
import { IsUniqueEmail } from '../validators/is-unique-email.validator';
import { IsUniquePhoneNumber } from '../validators/is-unique-phone-number.validator';

export class CreateAdministratorDto {
  @Expose({ name: 'first_name' })
  @IsNotEmpty({
    message: validationErrorMessage(
      'errors.field_required',
      ErrorCode.FIELD_REQUIRED,
      'first_name',
    ),
  })
  firstName: string;

  @Expose({ name: 'last_name' })
  @IsNotEmpty({
    message: validationErrorMessage(
      'errors.field_required',
      ErrorCode.FIELD_REQUIRED,
      'last_name',
    ),
  })
  lastName: string;

  @Expose({ name: 'email_address' })
  @IsUniqueEmail({
    message: validationErrorMessage(
      'errors.email_address_exists',
      ErrorCode.EMAIL_ADDRESS_EXISTS,
      'email_address',
    ),
  })
  @IsEmail(
    {},
    {
      message: validationErrorMessage(
        'errors.email_address_invalid',
        ErrorCode.EMAIL_ADDRESS_INVALID,
        'email_address',
      ),
    },
  )
  @IsNotEmpty({
    message: validationErrorMessage(
      'errors.field_required',
      ErrorCode.FIELD_REQUIRED,
      'email_address',
    ),
  })
  emailAddress: string;

  @Expose({ name: 'phone_number' })
  @IsUniquePhoneNumber({
    message: validationErrorMessage(
      'errors.phone_number_exists',
      ErrorCode.PHONE_NUMBER_EXISTS,
      'phone_number',
    ),
  })
  @IsPhoneNumber('NG', {
    message: validationErrorMessage(
      'errors.phone_number_invalid',
      ErrorCode.PHONE_NUMBER_INVALID,
      'phone_number',
    ),
  })
  @IsNotEmpty({
    message: validationErrorMessage(
      'errors.field_required',
      ErrorCode.FIELD_REQUIRED,
      'phone_number',
    ),
  })
  phoneNumber: string;

  @MinLength(6, {
    message: validationErrorMessage(
      'errors.password_length',
      ErrorCode.PASSWORD_LENGTH,
    ),
  })
  @IsNotEmpty({
    message: validationErrorMessage(
      'errors.field_required',
      ErrorCode.FIELD_REQUIRED,
    ),
  })
  password: string;
}
