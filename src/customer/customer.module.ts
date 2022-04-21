import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { IsUniqueEmailConstraint } from './validators/is-unique-email.validator';
import { IsUniquePhoneNumberConstraint } from './validators/is-unique-phone-number.validator';
import { PermissionModule } from 'src/permission/permission.module';
import { CustomerRepository } from './customer.repository';

@Module({
  controllers: [CustomerController],
  providers: [
    CustomerService,
    IsUniqueEmailConstraint,
    IsUniquePhoneNumberConstraint,
  ],
  imports: [
    TypeOrmModule.forFeature([Customer, CustomerRepository]),
    PermissionModule,
  ],
  exports: [TypeOrmModule],
})
export class CustomerModule {}
