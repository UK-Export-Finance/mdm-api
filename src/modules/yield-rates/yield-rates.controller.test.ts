import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';
import { Response } from 'express';

import { YieldRatesController } from './yield-rates.controller';
import { YieldRatesService } from './yield-rates.service';

const chance = new Chance();

// Minimal mock of express Response. "as any" is required to get around Typescript type check.
// TODO: this can be rewritten to use mock library.
const mockResponseObject = {
  set: jest.fn().mockReturnValue({}),
} as any as Response;

describe('YieldRatesController', () => {
  let yieldRatesController: YieldRatesController;
  let yieldRatesService: YieldRatesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [YieldRatesController],
      providers: [
        YieldRatesService,
        {
          provide: YieldRatesService,
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                id: chance.natural(),
                facilityURN: chance.natural({ min: 10000000, max: 99999999 }).toString(),
                calculationDate: chance.word(),
                income: chance.natural(),
                incomePerDay: chance.word(),
                exposure: chance.currency().code,
                period: chance.natural(),
                daysInPeriod: chance.word(),
                effectiveFrom: chance.date({ string: true }),
                effectiveTo: chance.date({ string: true }),
                created: chance.date({ string: true }),
                updated: chance.date({ string: true }),
                isActive: 'Y',
              },
            ]),
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    yieldRatesController = app.get<YieldRatesController>(YieldRatesController);
    yieldRatesService = app.get<YieldRatesService>(YieldRatesService);
  });

  it('should be defined', () => {
    expect(yieldRatesController).toBeDefined();
  });

  describe('find()', () => {
    it('should call service find function', () => {
      yieldRatesController.find({ searchDate: '2023-03-02' });

      expect(yieldRatesService.find).toHaveBeenCalled();
    });
  });
});
