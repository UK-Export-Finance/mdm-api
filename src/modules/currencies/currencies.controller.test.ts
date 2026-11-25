import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';

import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { GetCurrencyExchangeDto } from './dto';
import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyExchangeEntity } from './entities/currency-exchange.entity';

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
            findAll: jest.fn<CurrenciesService['findAll']>().mockResolvedValue([new CurrencyEntity()]),
            findOne: jest.fn<CurrenciesService['findOne']>().mockResolvedValue([new CurrencyEntity()]),
            findExchangeRate: jest.fn<CurrenciesService['findExchangeRate']>().mockResolvedValue([new CurrencyExchangeEntity()]),
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

      expect(currencyService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('fineOne()', () => {
    it('should return one currency', async () => {
      await currencyController.findOne({ isoCode: 'GBP' });

      expect(currencyService.findOne).toHaveBeenCalledTimes(1);
      expect(currencyService.findOne).toHaveBeenCalledWith('GBP');
    });
  });

  describe('findCurrencyExchange()', () => {
    it('should return currency exchange rate', async () => {
      const query = new GetCurrencyExchangeDto();
      await currencyController.findExchangeRate(query);

      expect(currencyService.findExchangeRate).toHaveBeenCalledTimes(1);
      expect(currencyService.findExchangeRate).toHaveBeenCalledWith(query.source, query.target, query.exchangeRateDate);
    });
  });
});
