import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  validateApiKey(apiKey: string) {
    const apiKeys: string[] = this.configService.get<string>('app.apiKey')?.split(',') || [];
    return apiKeys.find((key) => apiKey === key);
  }
}
