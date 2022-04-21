import {
  ClassSerializerInterceptor,
  Global,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule, I18nService } from 'nestjs-i18n';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { AllExceptionFilter } from './error/all-exception.filter';
import { appValidationErrorFactory } from './error/validation-error-message.function';
import { ResponseMessageInterceptor } from './utils/response-message/response-message.interceptor';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';
import { ModelMapperService } from './utils/model-mapper/model-mapper.service';
import { PasswordHashService } from './utils/password-hash/password-hash.service';
import { AdministratorModule } from './administrator/administrator.module';
import { StringGeneratorService } from './utils/string-generator/string-generator.service';
import { PaginationService } from './utils/pagination/pagination.service';
import { CategoryModule } from './category/category.module';
import { PhotoModule } from './photo/photo.module';

@Global()
@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseMessageInterceptor,
    },
    {
      provide: APP_PIPE,
      inject: [I18nService],
      useFactory: (i18n: I18nService) =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          stopAtFirstError: true,
          forbidNonWhitelisted: true,
          exceptionFactory: appValidationErrorFactory(i18n),
        }),
    },
    PasswordHashService,
    ModelMapperService,
    StringGeneratorService,
    PaginationService,
  ],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        bigNumberStrings: false,
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    CustomerModule,
    AuthModule,
    PermissionModule,
    AdministratorModule,
    CategoryModule,
    PhotoModule,
  ],
  exports: [
    ModelMapperService,
    PasswordHashService,
    StringGeneratorService,
    PaginationService,
  ],
})
export class AppModule {}
