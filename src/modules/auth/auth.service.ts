import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { timingSafeEqual } from 'crypto';

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

    const keyBuffer = Buffer.from(apiKey);

    const providedBuffer = Buffer.from(providedKey);

    if (keyBuffer.length !== providedBuffer.length) {
      return false;
    }

    return timingSafeEqual(keyBuffer, providedBuffer);
  }
}
