import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Administrator } from './entities/administrator.entity';
import { IsUniquePhoneNumberConstraint } from './validators/is-unique-phone-number.validator';
import { IsUniqueEmailConstraint } from './validators/is-unique-email.validator';
import { AdministratorRepository } from './administrator.repository';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  controllers: [AdministratorController],
  providers: [
    AdministratorService,
    IsUniqueEmailConstraint,
    IsUniquePhoneNumberConstraint,
  ],
  imports: [
    TypeOrmModule.forFeature([Administrator, AdministratorRepository]),
    PermissionModule,
  ],
  exports: [TypeOrmModule],
})
export class AdministratorModule {}
