import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AUTH } from '@ukef/constants';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, AUTH.STRATEGY) {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {
    const headerKeyApiKey: string = configService.get<string>('app.apiKeyStrategy');
    super({ header: headerKeyApiKey, prefix: '' }, true, (apiKey: string, done: (arg0: UnauthorizedException, arg1: boolean) => void) => {
      const hasValidKey = this.authService.validateApiKey(apiKey);
      if (hasValidKey) {
        return done(null, true);
      }
      done(new UnauthorizedException(), null);
    });
  }
}
