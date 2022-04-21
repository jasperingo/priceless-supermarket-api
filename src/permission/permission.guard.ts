import { ForbiddenException, Injectable } from '@nestjs/common';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { ErrorCode } from 'src/error/error-code.constants';
import { AdministratorPermissionFactory } from './administrator-permission.factory';
import { CustomerPermissionFactory } from './customer-permission.factory';

@Injectable()
export class PermissionGuard {
  constructor(
    private customerPermissionFactory: CustomerPermissionFactory,
    private administratorPermissionFactory: AdministratorPermissionFactory,
  ) {}

  getAbility(req: any) {
    const user = req.user;

    if (user instanceof Customer) {
      return this.customerPermissionFactory.create(user);
    } else if (user instanceof Administrator) {
      return this.administratorPermissionFactory.create(user);
    }

    throw this.getForbidden();
  }

  getForbidden() {
    return new ForbiddenException(
      'errors.permission_denied',
      ErrorCode.PERMISSION_DENIED,
    );
  }
}
