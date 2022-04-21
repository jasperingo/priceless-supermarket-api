import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Customer } from 'src/customer/entities/customer.entity';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): Customer | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
