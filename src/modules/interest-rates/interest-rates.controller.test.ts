import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';

import { InterestRatesController } from './interest-rates.controller';
import { InterestRatesService } from './interest-rates.service';

const chance = new Chance();

describe('InterestRatesController', () => {
  let interestRatesController: InterestRatesController;
  let interestRatesService: InterestRatesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [InterestRatesController],
      providers: [
        InterestRatesService,
        {
          provide: InterestRatesService,
          useValue: {
            findAll: jest.fn<InterestRatesService['findAll']>().mockResolvedValue([
              {
                id: chance.natural(),
                category: chance.word(),
                subCategory: chance.word(),
                termMonths: chance.natural(),
                sourceTerm: chance.word(),
                currency: chance.currency().code,
                interestRate: chance.natural(),
                bukKey: chance.word(),
                effectiveFrom: chance.date(),
                effectiveTo: chance.date(),
                created: chance.date(),
                updated: chance.date(),
              },
            ]),
          },
        },
      ],
    }).compile();

    interestRatesController = app.get<InterestRatesController>(InterestRatesController);
    interestRatesService = app.get<InterestRatesService>(InterestRatesService);
  });

  it('should be defined', () => {
    expect(interestRatesController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return all interest rates', async () => {
      await interestRatesController.findAll();

      expect(interestRatesService.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
