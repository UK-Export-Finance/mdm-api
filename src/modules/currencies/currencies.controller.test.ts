import { Test, TestingModule } from '@nestjs/testing';

import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { GetCurrencyExchangeDto } from './dto';

describe('CurrenciesController', () => {
  let currencyController: CurrenciesController;
  let currencyService: CurrenciesService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      providers: [
        CurrenciesService,
        {
          provide: CurrenciesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{}]),
            findOne: jest.fn().mockResolvedValue([{}]),
            findExchangeRate: jest.fn().mockResolvedValue([{}]),
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
    it('should return all currencies', async () => {
      await currencyController.findAll();

      expect(currencyService.findAll).toHaveBeenCalled();
    });
  });

  describe('fineOne()', () => {
    it('should return one currency', async () => {
      await currencyController.findOne({ isoCode: 'GBP' });

      expect(currencyService.findOne).toHaveBeenCalled();
    });
  });

  describe('findCurrencyExchange()', () => {
    it('should return currency exchange rate', async () => {
      const query = new GetCurrencyExchangeDto();
      await currencyController.findExchangeRate(query);

      expect(currencyService.findExchangeRate).toHaveBeenCalled();
    });
  });
});
