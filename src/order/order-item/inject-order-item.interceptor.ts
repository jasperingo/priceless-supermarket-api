import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { REQUEST_CONTEXT } from '../../auth/inject-user.interceptor';

@Injectable()
export class InjectOrderItemInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request['body']) {
      request['body'][REQUEST_CONTEXT].orderItem = request.data.orderItem;
    }

    return next.handle();
  }
}
