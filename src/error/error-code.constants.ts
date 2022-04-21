export enum ErrorCode {
  FIELD_INVALID = 'FIELD_INVALID',
  FIELD_REQUIRED = 'FIELD_REQUIRED',
  EMAIL_ADDRESS_INVALID = 'EMAIL_ADDRESS_INVALID',
  EMAIL_ADDRESS_EXISTS = 'EMAIL_ADDRESS_EXISTS',
  PHONE_NUMBER_INVALID = 'PHONE_NUMBER_INVALID',
  PHONE_NUMBER_EXISTS = 'PHONE_NUMBER_EXISTS',
  NAME_EXISTS = 'NAME_EXISTS',
  PASSWORD_LENGTH = 'PASSWORD_LENGTH',

  CREDENTIALS_INCORRECT = 'CREDENTIALS_INCORRECT',
  CREDENTIALS_MISSING = 'CREDENTIALS_MISSING',
  INVALID_TOKEN = 'INVALID_TOKEN',
  INVALID_TOKEN_PAYLOAD = 'INVALID_TOKEN_PAYLOAD',
  PERMISSION_DENIED = 'PERMISSION_DENIED',

  ID_NOT_NUMBER = 'ID_NOT_NUMBER',

  CUSTOMER_DO_NOT_EXIST = 'CUSTOMER_DO_NOT_EXIST',
  ADMINISTRATOR_DO_NOT_EXIST = 'ADMINISTRATOR_DO_NOT_EXIST',

  PHOTO_NAME_GENERATION_FAILED = 'PHOTO_NAME_GENERATION_FAILED',
  PHOTO_CATEGORY_ID_EXISTS = 'PHOTO_CATEGORY_ID_EXISTS',
}
