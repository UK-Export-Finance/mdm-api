import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';

import { GetExposurePeriodQueryDto } from './dto/get-exposure-period-query.dto';
import { ExposurePeriodController } from './exposure-period.controller';
import { ExposurePeriodService } from './exposure-period.service';

const chance = new Chance();

describe('ConstantsController', () => {
  let exposurePeriodController: ExposurePeriodController;
  let exposurePeriodService: ExposurePeriodService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExposurePeriodController],
      providers: [
        ExposurePeriodService,
        {
          provide: ExposurePeriodService,
          useValue: {
            calculate: jest.fn().mockResolvedValue([
              {
                exposurePeriod: chance.integer(),
              },
            ]),
          },
        },
      ],
    }).compile();

    exposurePeriodController = app.get<ExposurePeriodController>(ExposurePeriodController);
    exposurePeriodService = app.get<ExposurePeriodService>(ExposurePeriodService);
  });

  it('should be defined', () => {
    expect(exposurePeriodService).toBeDefined();
  });

  describe('find()', () => {
    it('should return all constants', async () => {
      const query = new GetExposurePeriodQueryDto();
      await exposurePeriodController.find(query);

      expect(exposurePeriodService.calculate).toHaveBeenCalled();
    });
  });
});
