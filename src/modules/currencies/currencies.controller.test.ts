import { Test, TestingModule } from '@nestjs/testing';

import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesController', () => {
  let currencyController: CurrenciesController;
  let currencyService: CurrenciesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [
        CurrenciesService,
        {
          provide: CurrenciesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{}]),
          },
        },
      ],
    }).compile();

    currencyController = app.get<CurrenciesController>(CurrenciesController);

    currencyService = app.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(currencyController).toBeDefined();
    expect(currencyService).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all currencies', () => {
      currencyController.findAll();

      expect(currencyService.findAll).toHaveBeenCalled();
    });
  });
});
