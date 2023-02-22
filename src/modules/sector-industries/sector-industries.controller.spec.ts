import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';

import { GetSectorIndustriesQueryDto } from './dto/get-sector-industries-query.dto';
import { SectorIndustriesController } from './sector-industries.controller';
import { SectorIndustriesService } from './sector-industries.service';

const chance = new Chance();

describe('SectorIndustriesController', () => {
  let sectorIndustriesController: SectorIndustriesController;
  let sectorIndustriesService: SectorIndustriesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SectorIndustriesController],
      providers: [
        SectorIndustriesService,
        {
          provide: SectorIndustriesService,
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                id: chance.natural(),
                ukefSectorId: chance.natural(),
                ukefSectorName: chance.sentence({ words: 5 }),
                internalNo: null,
                ukefIndustryId: chance.natural(),
                ukefIndustryName: chance.sentence({ words: 5 }),
                acbsSectorId: chance.natural(),
                acbsSectorName: chance.sentence({ words: 5 }),
                acbsIndustryId: chance.natural(),
                acbsIndustryName: chance.sentence({ words: 5 }),
                created: chance.date({ string: true }),
                updated: chance.date({ string: true }),
                effectiveFrom: chance.date({ string: true }),
                effectiveTo: chance.date({ string: true }),
              },
            ]),
          },
        },
      ],
    }).compile();

    sectorIndustriesController = app.get<SectorIndustriesController>(SectorIndustriesController);
    sectorIndustriesService = app.get<SectorIndustriesService>(SectorIndustriesService);
  });

  it('should be defined', () => {
    expect(sectorIndustriesController).toBeDefined();
  });

  describe('find()', () => {
    it('should return all sector industry records', () => {
      const query = new GetSectorIndustriesQueryDto();
      sectorIndustriesController.find(query);

      expect(sectorIndustriesService.find).toHaveBeenCalled();
    });
  });
});
