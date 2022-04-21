import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { map, Observable } from 'rxjs';
import { AppResponseDTO } from '../app-response.dto';

@Injectable()
export class ResponseMessageInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: AppResponseDTO<any>) => {
        res.message && (res.message = this.i18n.t(res.message));
        return res;
      }),
    );
  }
}
