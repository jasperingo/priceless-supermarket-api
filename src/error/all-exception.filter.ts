import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { ErrorCode } from './error-code.constants';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;
    let exceptionBody: { message: string; errorCode?: ErrorCode; data?: any };

    console.error(exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const execeptionRes = exception.getResponse() as any;

      if (exception instanceof BadRequestException) {
        exceptionBody = {
          message: execeptionRes.error,
          data: execeptionRes.message,
        };
      } else {
        exceptionBody = {
          message: execeptionRes.message,
          errorCode: execeptionRes.error,
        };
      }
    } else {
      status = 500;
      exceptionBody = {
        message:
          exception.message || new InternalServerErrorException().message,
      };
    }

    response
      .status(status)
      .json(
        AppResponseDTO.error(
          this.i18n.t(exceptionBody.message),
          exceptionBody.errorCode,
          exceptionBody.data,
        ),
      );
  }
}
