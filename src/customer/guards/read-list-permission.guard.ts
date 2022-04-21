import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Action } from 'src/permission/Action.enum';
import { PermissionGuard } from 'src/permission/permission.guard';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class ReadListPermissionGuard
  extends PermissionGuard
  implements CanActivate
{
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const ability = this.getAbility(req);

    if (ability.can(Action.ReadList, Customer)) return true;

    throw this.getForbidden();
  }
}
