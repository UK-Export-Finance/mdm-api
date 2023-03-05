import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'x-api-key') {
  constructor(private authService: AuthService, private configService: ConfigService) {
    const headerKeyApiKey = configService.get<string>('app.apiKeyStrategy');
    super({ header: headerKeyApiKey, prefix: '' }, true, (apiKey: string, done: (arg0: UnauthorizedException, arg1: boolean) => void) => {
      const checkKey = this.authService.validateApiKey(apiKey);
      if (checkKey) {
        done(null, true);
      }
      done(new UnauthorizedException(), null);
    });
  }
}
