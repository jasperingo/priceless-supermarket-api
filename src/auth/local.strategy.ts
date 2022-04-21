import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ErrorCode } from 'src/error/error-code.constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email_address' });
  }

  async validate(emailAddress: string, password: string) {
    const user = await this.authService.authCustomer(emailAddress, password);

    if (!user)
      throw new UnauthorizedException(
        'errors.credentials_incorrect',
        ErrorCode.CREDENTIALS_INCORRECT,
      );

    return user;
  }
}
