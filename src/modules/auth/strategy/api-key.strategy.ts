import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AUTH } from '@ukef/constants';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../auth.service';

@Injectable()
/**
 * Passport strategy for API key authentication using a configurable header.
 *
 * This strategy extracts the API key from a specified HTTP header and validates it
 * using the provided `AuthService`. The header name is configured via the `ConfigService`
 * using the `app.apiKeyStrategy` configuration key.
 *
 * @extends {PassportStrategy}
 *
 * @param authService - Service responsible for validating API keys.
 * @param configService - Service for accessing application configuration.
 *
 * @throws {UnauthorizedException} If the supplied API key is invalid.
 *
 * @example
 * // Usage in a controller
 * @UseGuards(AuthGuard(AUTH.STRATEGY))
 * @Get('protected')
 * getProtectedResource() {
 *   // ...
 * }
 */
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, AUTH.STRATEGY) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const headerKeyApiKeyStrategy: string = configService.get<string>('app.apiKeyStrategy');
    super({ header: headerKeyApiKeyStrategy, prefix: '' }, false);
  }

  validate(apikey: string): any {
    const valid = this.authService.validateApiKey(apikey);

    if (!valid) {
      throw new UnauthorizedException('Invalid API key has been supplied');
    }

    return true;
  }
}
