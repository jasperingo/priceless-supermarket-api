import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Action } from 'src/permission/Action.enum';
import { PermissionGuard } from 'src/permission/permission.guard';
import { Product } from '../entities/product.entity';

@Injectable()
export class CreatePermissionGuard
  extends PermissionGuard
  implements CanActivate
{
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const ability = this.getAbility(req);

    if (ability.can(Action.Create, Product)) return true;

    throw this.getForbidden();
  }
}
