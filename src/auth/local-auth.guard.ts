import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorCode } from 'src/error/error-code.constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw (
        error ||
        new UnauthorizedException(
          'errors.credentials_missing',
          ErrorCode.CREDENTIALS_MISSING,
        )
      );
    }
    return user;
  }
}
