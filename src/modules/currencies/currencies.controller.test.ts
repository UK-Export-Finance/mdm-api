import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';

import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { GetCurrencyExchangeDto } from './dto/get-currency-exchange.dto';
const chance = new Chance();

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
