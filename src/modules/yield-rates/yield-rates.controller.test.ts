import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';

import { YieldRatesController } from './yield-rates.controller';
import { YieldRatesService } from './yield-rates.service';

const chance = new Chance();

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
    it('should call service find function', async () => {
      const mockSearchDate = '2023-03-02';

      await yieldRatesController.find({ searchDate: mockSearchDate });

      expect(yieldRatesService.find).toHaveBeenCalledTimes(1);
      expect(yieldRatesService.find).toHaveBeenCalledWith(mockSearchDate);
    });
  });
});
