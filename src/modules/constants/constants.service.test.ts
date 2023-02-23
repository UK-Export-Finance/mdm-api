import { Test, TestingModule } from '@nestjs/testing';
import Chance from 'chance';

import { ConstantsController } from './constants.controller';
import { ConstantsService } from './constants.service';
import { GetConstantsSpiQueryDto } from './dto/get-constants-spi-query.dto';

const chance = new Chance();

describe('ConstantsService', () => {
  let constantsController: ConstantsController;
  let constantsService: ConstantsService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ConstantsController],
      providers: [
        ConstantsService,
        {
          provide: ConstantsService,
          useValue: {
            find: jest.fn().mockResolvedValue([
              {
                id: chance.natural(),
                category: chance.letter(),
                subCategory: chance.word(),
                oecdRiskCategory: '0',
                value: chance.natural(),
                constQualityGrade: chance.sentence({ words: 2 }),
                constRepaymentFrequency: chance.integer(),
                constInterestRate: chance.integer(),
              },
            ]),
          },
        },
      ],
    }).compile();

    constantsController = app.get<ConstantsController>(ConstantsController);
    constantsService = app.get<ConstantsService>(ConstantsService);
  });

  it('should be defined', () => {
    expect(constantsService).toBeDefined();
  });

  describe('find()', () => {
    it('should return all constants', () => {
      const query = new GetConstantsSpiQueryDto();
      constantsController.find(query);

      expect(constantsService.find).toHaveBeenCalled();
    });
  });
});
