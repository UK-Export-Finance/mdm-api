import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';
import dotenv from 'dotenv';

import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './strategy/api-key.strategy';

dotenv.config();
const { API_KEY } = process.env;

describe('AuthService', () => {
  let authService: AuthService;
  let configService: ConfigService;

  const chance = new Chance();
  const invalidKeys = [null, undefined, '', 'invalid', chance.word()];

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [AuthService, ApiKeyStrategy, ConfigService],
    }).compile();

    authService = app.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    configService = {
      get: jest.fn().mockReturnValue(API_KEY),
    } as any;

    authService = new AuthService(configService);
  });

  it('should be defined', () => {
    // Assert
    expect(authService).toBeDefined();
  });

  it.each(invalidKeys)('should return `false` when API Key is %s', (key) => {
    // Act
    const result = authService.validateApiKey(key);

    // Assert
    expect(result).toBe(false);
  });

  it('should return `true` when API Key is valid', () => {
    // Act
    const result = authService.validateApiKey(API_KEY);

    // Assert
    expect(result).toBe(true);
  });
});

describe('ApiKeyStrategy', () => {
  let strategy: ApiKeyStrategy;
  let authService: AuthService;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    configService = {
      get: jest.fn().mockReturnValue(API_KEY),
    } as any;

    authService = new AuthService(configService);
    strategy = new ApiKeyStrategy(authService, configService);
  });

  describe('validate', () => {
    it('should return true for valid API key', () => {
      // Act
      const result = strategy.validate(API_KEY);

      // Assert
      expect(result).toBe(true);
      expect(configService.get).toHaveBeenCalledWith('app.apiKeyStrategy');
      expect(configService.get).toHaveBeenCalledWith('app.apiKey');
      expect(configService.get).toHaveBeenCalledTimes(2);
    });

    it('should throw UnauthorizedException when the provided API key is invalid', () => {
      // Arrange
      const error = new UnauthorizedException('Invalid API key has been supplied');

      // Assert
      expect(() => strategy.validate('invalid-key')).toThrow(error);
      expect(configService.get).toHaveBeenCalledWith('app.apiKeyStrategy');
      expect(configService.get).toHaveBeenCalledWith('app.apiKey');
      expect(configService.get).toHaveBeenCalledTimes(2);
    });
  });
});
