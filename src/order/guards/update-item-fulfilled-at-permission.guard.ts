import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Action } from 'src/permission/Action.enum';
import { PermissionGuard } from 'src/permission/permission.guard';

@Injectable()
export class UpdateItemFulfilledAtPermissionGuard
  extends PermissionGuard
  implements CanActivate
{
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const ability = this.getAbility(req);

    if (ability.can(Action.Update, req.data.orderItem, 'fulfilledAt'))
      return true;

    throw this.getForbidden();
  }
}
