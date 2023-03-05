import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';

import { AuthService } from './auth.service';
import { ApiKeyStrategy } from './strategy/apikey.strategy';

describe('AuthService', () => {
  let spyService: AuthService;
  const chance = new Chance();

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PassportModule],
      providers: [
        AuthService,
        ApiKeyStrategy,
        ConfigService,
        {
          provide: AuthService,
          useValue: {
            validateApiKey: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    spyService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(spyService).toBeDefined();
  });

  it('should call `validateApiKey` with expected param', () => {
    const key = chance.word();
    spyService.validateApiKey(key);

    expect(spyService.validateApiKey).toHaveBeenCalledWith(key);
  });
});
