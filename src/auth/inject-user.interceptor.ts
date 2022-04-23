import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export const REQUEST_CONTEXT = '_requestContext';

@Injectable()
export class InjectUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request['body']) {
      request['body'][REQUEST_CONTEXT] = {
        user: request.user,
      };
    }

    return next.handle();
  }
}
