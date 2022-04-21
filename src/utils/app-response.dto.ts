import { ErrorCode } from 'src/error/error-code.constants';

export enum AppResponseStatus {
  ERROR = 'error',
  SUCCESS = 'success',
}

export class AppResponseDTO<T> {
  status: AppResponseStatus;

  message: string;

  error_code?: ErrorCode;

  data?: T;

  constructor(
    status: AppResponseStatus,
    message: string,
    data?: T,
    errorCode?: ErrorCode,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error_code = errorCode;
  }

  static error<T>(message: string, errorCode?: ErrorCode, data?: T) {
    return new AppResponseDTO(
      AppResponseStatus.ERROR,
      message,
      data,
      errorCode,
    );
  }

  static success<T>(message: string, data?: T) {
    return new AppResponseDTO(AppResponseStatus.SUCCESS, message, data);
  }
}
