import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorCode } from 'src/error/error-code.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(error: any, user: any) {
    if (error || !user) {
      throw (
        error ||
        new UnauthorizedException(
          'errors.invalid_token',
          ErrorCode.INVALID_TOKEN,
        )
      );
    }
    return user;
  }
}
