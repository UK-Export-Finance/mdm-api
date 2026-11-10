import { jest } from '@jest/globals';
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
            find: jest.fn<YieldRatesService['find']>().mockResolvedValue([
              {
                id: chance.natural(),
                shortName: chance.word(),
                pxBidPrice: chance.floating(),
                pxAskPrice: chance.floating(),
                pxLastPrice: chance.floating(),
                pxMidPrice: chance.floating(),
                futureMonthYear: chance.word(),
                sourceErrorCode: 0,
                sourceUpdateTimestamp: '16:01:08',
                yieldIndex: chance.word(),
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
