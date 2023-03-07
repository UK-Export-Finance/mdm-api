import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';

import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './strategy/api-key.strategy';

describe('AuthService', () => {
  let authsService: AuthService;
  const chance = new Chance();

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [AuthService, ApiKeyStrategy, ConfigService],
    }).compile();

    authsService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authsService).toBeDefined();
  });

  it('should return `false` when API Key is invalid', () => {
    const key = chance.word();
    const result = authsService.validateApiKey(key);

    expect(result).toBe(false);
  });

  it('should return `false` when API Key is not provided', () => {
    const result = authsService.validateApiKey('');

    expect(result).toBe(false);
  });

  it('should return `true` when API Key is valid', () => {
    const { API_KEY } = process.env;
    const result = authsService.validateApiKey(API_KEY);

    expect(result).toBe(true);
  });
});
