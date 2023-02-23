import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { ConstantsService } from './constants.service';
import { ConstantSpiEntity } from './entities/constants-spi.entity';

describe('ConstantsService', () => {
  let service: ConstantsService;

  type MockType<T> = {
    [P in keyof T]?: jest.Mock<object>;
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
  }));

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ConstantsService, { provide: 'mssql-cis_ConstantSpiEntityRepository', useFactory: repositoryMockFactory }],
    }).compile();

    service = module.get<ConstantsService>(ConstantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
