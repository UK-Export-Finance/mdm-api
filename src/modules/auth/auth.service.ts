import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

    return apiKey === providedKey;
  }
}
