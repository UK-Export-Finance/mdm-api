import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';
import { Response } from 'express';

import { CreatePremiumScheduleDto } from './dto/create-premium-schedule.dto';
import { PremiumSchedulesController } from './premium-schedules.controller';
import { PremiumSchedulesService } from './premium-schedules.service';

const chance = new Chance();

// Minimal mock of express Response. "as any" is required to get around Typescript type check.
// TODO: this can be rewritten to use mock library.
const mockResponseObject = {
  set: jest.fn().mockReturnValue({}),
} as any as Response;

describe('PremiumSchedulesController', () => {
  let premiumSchedulesController: PremiumSchedulesController;
  let premiumSchedulesService: PremiumSchedulesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PremiumSchedulesController],
      providers: [
        PremiumSchedulesService,
        {
          provide: PremiumSchedulesService,
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

    premiumSchedulesController = app.get<PremiumSchedulesController>(PremiumSchedulesController);
    premiumSchedulesService = app.get<PremiumSchedulesService>(PremiumSchedulesService);
  });

  it('should be defined', () => {
    expect(PremiumSchedulesController).toBeDefined();
  });

  describe('create()', () => {
    it('should create schedule rates', () => {
      const createSchedules = new CreatePremiumScheduleDto();
      premiumSchedulesController.create(mockResponseObject, [createSchedules]);

      expect(premiumSchedulesService.create).toHaveBeenCalled();
    });
  });

  describe('find()', () => {
    it('should find premium schedules for Facility id', () => {
      premiumSchedulesController.find({ facilityId: chance.natural({ min: 10000000, max: 99999999 }).toString() });

      expect(premiumSchedulesService.find).toHaveBeenCalled();
    });
  });
});
