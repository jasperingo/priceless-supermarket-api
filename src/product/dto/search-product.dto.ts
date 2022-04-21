import { Expose } from 'class-transformer';
import {
  Allow,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ErrorCode } from 'src/error/error-code.constants';
import {
  numberErrorMessage,
  requiredErrorMessage,
  validationErrorMessage,
} from 'src/error/validation-error-message.function';

export class SearchProductDto {
  @MinLength(3, {
    message: validationErrorMessage(
      'errors.field_min_length',
      ErrorCode.FIELD_MIN_LENGTH,
    ),
  })
  @IsNotEmpty({ message: requiredErrorMessage() })
  @ValidateIf(
    (o: SearchProductDto) => o.q !== undefined || o.categoryId === undefined,
  )
  q: string;

  @Expose({ name: 'category_id' })
  @IsNumberString({}, { message: numberErrorMessage('category_id') })
  @IsNotEmpty({ message: requiredErrorMessage('category_id') })
  @IsOptional()
  categoryId: number;

  @Allow()
  limit: number;

  @Allow()
  after: number;

  @Allow()
  before: number;
}
