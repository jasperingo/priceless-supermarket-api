import { Module } from '@nestjs/common';
import { AdministratorPermissionFactory } from './administrator-permission.factory';
import { CustomerPermissionFactory } from './customer-permission.factory';

@Module({
  providers: [CustomerPermissionFactory, AdministratorPermissionFactory],
  exports: [CustomerPermissionFactory, AdministratorPermissionFactory],
})
export class PermissionModule {}
