import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  validateApiKey(key: string): boolean {
    const apiKey: string = this.configService.get<string>('app.apiKey');
    return apiKey === key;
  }
}
