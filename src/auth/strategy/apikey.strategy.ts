import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor(private authService: AuthService, private configService: ConfigService) {
    const headerKeyApiKey = configService.get<string>('HEADER_KEY_API_KEY') || '';

    super({ header: headerKeyApiKey, prefix: '' }, true, (apiKey, done) => {
      const checkKey = this.authService.validateApiKey(apiKey);
      if (checkKey) {
        done(null, true);
      }
      done(new UnauthorizedException(), null);
    });
  }
}
