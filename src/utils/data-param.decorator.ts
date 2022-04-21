import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DataParam = createParamDecorator(
  (prop: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const data = request.data;

    return prop ? data?.[prop] : data;
  },
);
