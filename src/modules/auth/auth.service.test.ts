import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';

import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './strategy/api-key.strategy';

describe('AuthService', () => {
  let authService: AuthService;
  const chance = new Chance();

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [AuthService, ApiKeyStrategy, ConfigService],
    }).compile();

    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should return `false` when API Key is invalid', () => {
    const key = chance.word();
    const result = authService.validateApiKey(key);

    expect(result).toBe(false);
  });

  it('should return `false` when API Key is not provided', () => {
    const result = authService.validateApiKey('');

    expect(result).toBe(false);
  });

  it('should return `true` when API Key is valid', () => {
    const { API_KEY } = process.env;
    const result = authService.validateApiKey(API_KEY);

    expect(result).toBe(true);
  });
});
