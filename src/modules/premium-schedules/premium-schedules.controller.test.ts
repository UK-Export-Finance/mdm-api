import { jest } from '@jest/globals';
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
  set: jest.fn<Response['set']>().mockReturnThis(),
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
            find: jest.fn<PremiumSchedulesService['find']>().mockResolvedValue([
              {
                id: chance.natural(),
                facilityURN: chance.natural({ min: 10000000, max: 99999999 }).toString(),
                calculationDate: chance.date(),
                income: chance.natural(),
                incomePerDay: chance.natural(),
                exposure: chance.natural(),
                period: chance.natural(),
                daysInPeriod: chance.natural(),
                effectiveFrom: chance.date(),
                effectiveTo: chance.date().toISOString(),
                created: chance.date(),
                updated: chance.date(),
                isActive: 'Y',
              },
            ]),
            create: jest.fn<PremiumSchedulesService['create']>().mockResolvedValue([]),
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
    it('should create schedule rates', async () => {
      const createSchedules = new CreatePremiumScheduleDto();
      await premiumSchedulesController.create(mockResponseObject, [createSchedules]);

      expect(premiumSchedulesService.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('find()', () => {
    it('should find premium schedules for Facility id', async () => {
      const mockFacilityId = chance.natural({ min: 10000000, max: 99999999 }).toString();

      await premiumSchedulesController.find({ facilityId: mockFacilityId });

      expect(premiumSchedulesService.find).toHaveBeenCalledTimes(1);
      expect(premiumSchedulesService.find).toHaveBeenCalledWith(mockFacilityId);
    });
  });
});
