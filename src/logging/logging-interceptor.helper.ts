import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestBody = context.switchToHttp().getRequest().body;
    this.logger.debug({ requestBody }, 'Handling the following request from the client.');

    return next.handle().pipe(
      tap((responseBody) => {
        this.logger.debug({ responseBody }, 'Returning the following response to the client.');
      }),
    );
  }
}
