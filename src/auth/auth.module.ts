import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CustomerModule } from 'src/customer/customer.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AdministratorModule } from 'src/administrator/administrator.module';
import { AdminLocalStrategy } from './admin-local.strategy';

@Module({
  imports: [
    CustomerModule,
    AdministratorModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    ConfigService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AdminLocalStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
