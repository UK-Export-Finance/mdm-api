import { createHash, timingSafeEqual } from 'node:crypto';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AUTH } from '@ukef/constants';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Validates the provided API key.
   *
   * @param providedKey - The API key to validate.
   * @returns True if the API key is valid, otherwise false.
   */
  validateApiKey(providedKey: string): boolean {
    const apiKey: string = this.configService.get<string>('app.apiKey');

    if (!apiKey || !providedKey) {
      return false;
    }

    const apiKeyDigest = createHash(AUTH.HASH.SHA).update(apiKey, AUTH.HASH.UTF).digest();
    const providedKeyDigest = createHash(AUTH.HASH.SHA).update(providedKey, AUTH.HASH.UTF).digest();

    if (apiKeyDigest.length !== providedKeyDigest.length) {
      return false;
    }

    return timingSafeEqual(apiKeyDigest, providedKeyDigest);
  }
}
