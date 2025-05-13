import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AUTH } from '@ukef/constants';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from '../auth.service';

/**
 * Strategy for API key authentication using the `HeaderAPIKeyStrategy` from Passport.
 * This strategy validates API keys provided in the request headers.
 *
 * @class ApiKeyStrategy
 * @extends {PassportStrategy(HeaderAPIKeyStrategy, AUTH.STRATEGY)}
 *
 * @constructor
 * @param {AuthService} authService - Service for handling authentication logic.
 * @param {ConfigService} configService - Service for accessing application configuration.
 *
 * @method validate
 * Validates the provided API key.
 * Since `@nestjs/passport: 11.0.5`, `validate` is an abstract method
 * which should be implemented by the derived class, unless an abstract class.
 * @param {string} key - The API key extracted from the request header.
 * @returns {Promise<boolean>} - Resolves to `true` if the API key is valid.
 * @throws {UnauthorizedException} - Thrown if the API key is invalid.
 */
@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, AUTH.STRATEGY) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    const headerKeyApiKeyStrategy: string = configService.get<string>('app.apiKeyStrategy');
    super({ header: headerKeyApiKeyStrategy, prefix: '' }, true);
  }

  validate(key: string): boolean {
    const valid = this.authService.validateApiKey(key);

    if (!valid) {
      throw new UnauthorizedException('Invalid API key has been supplied');
    }

    return true;
  }
}
