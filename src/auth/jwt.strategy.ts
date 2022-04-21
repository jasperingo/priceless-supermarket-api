import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthJWT, UserType } from './auth.service';
import { CustomerRepository } from 'src/customer/customer.repository';
import { ErrorCode } from 'src/error/error-code.constants';
import { AdministratorRepository } from 'src/administrator/administrator.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly customersRepository: CustomerRepository,
    private readonly administratorsRepository: AdministratorRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  validate(payload: AuthJWT) {
    if (payload && payload.type === UserType.ADMINISTRATOR) {
      return this.administratorsRepository.findOne(payload.sub);
    }

    if (payload && payload.type === UserType.CUSTOMER) {
      return this.customersRepository.findOne(payload.sub);
    }

    throw new UnauthorizedException(
      'errors.invalid_token_payload',
      ErrorCode.INVALID_TOKEN_PAYLOAD,
    );
  }
}
