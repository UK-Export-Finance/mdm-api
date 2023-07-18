import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { NumbersService } from './numbers.service';

describe('NumbersService', () => {
  let service: NumbersService;
  const unSortedUkefIds = [
    {
      id: 201,
      maskedId: '1 - 2', // should be used for item 4
      type: 1,
      createdBy: 'Jest test 1',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 202,
      maskedId: '2 - 1',
      type: 2,
      createdBy: 'Jest test 2',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 203,
      maskedId: '2 - 2',
      type: 2,
      createdBy: 'Jest test 3',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 204,
      maskedId: '1 - 1', // should be used for item 1
      type: 1,
      createdBy: 'Jest test 4',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 205,
      maskedId: '1 - 3', // should stay here
      type: 1,
      createdBy: 'Jest test 5',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 206,
      maskedId: '99 - 1',
      type: 99,
      createdBy: 'Jest test 6',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
  ];
  const sortedUkefIds = [
    {
      id: 201,
      maskedId: '1 - 1',
      type: 1,
      createdBy: 'Jest test 1',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 202,
      maskedId: '2 - 1',
      type: 2,
      createdBy: 'Jest test 2',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 203,
      maskedId: '2 - 2',
      type: 2,
      createdBy: 'Jest test 3',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 204,
      maskedId: '1 - 2',
      type: 1,
      createdBy: 'Jest test 4',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 205,
      maskedId: '1 - 3',
      type: 1,
      createdBy: 'Jest test 5',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
    {
      id: 206,
      maskedId: '99 - 1',
      type: 99,
      createdBy: 'Jest test 6',
      createdDatetime: new Date('2023-02-17T11:14:04.977Z'),
      requestingSystem: 'Jest',
    },
  ];

  const groupedIds = {
    1: ['1 - 2', '1 - 1', '1 - 3'],
    2: ['2 - 1', '2 - 2'],
    99: ['99 - 1'],
  };

  const groupedAndSortedIds = {
    1: ['1 - 1', '1 - 2', '1 - 3'],
    2: ['2 - 1', '2 - 2'],
    99: ['99 - 1'],
  };

  type MockType<T> = {
    [P in keyof T]?: jest.Mock<object>;
  };

  const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    findOne: jest.fn((entity) => entity),
  }));

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        NumbersService,
        PinoLogger,
        { provide: 'pino-params', useValue: {} },
        ConfigService,
        { provide: 'mssql-number-generator_UkefIdRepository', useFactory: repositoryMockFactory },
      ],
    }).compile();
    service = module.get<NumbersService>(NumbersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Helper mapFieldsFromDbToApi()', () => {
    it('should rename fields', () => {
      const ukefId = {
        id: 20090248,
        maskedId: '0030000425',
        type: 1,
        createdBy: 'Jest',
        createdDatetime: '2023-02-17T11:14:04.977Z',
        requestingSystem: 'Jest 1 - Deal',
      };

      expect(
        service.mapFieldsFromDbToApi({
          DEAL_FACILITY_ID: 20090248,
          DEAL_FACILITY_ID_MASK: '0030000425',
          NBR_TYPE_ID: 1,
          CREATED_BY_USER: 'Jest',
          CREATED_DATETIME: '2023-02-17T11:14:04.977Z',
          REQUESTING_SYSTEM: 'Jest 1 - Deal',
        }),
      ).toEqual(ukefId);
    });
  });

  describe('Helper groupIdsByType()', () => {
    it('group array items', () => {
      // Ids are not sorted in the output!
      expect(service.groupIdsByType(unSortedUkefIds)).toEqual(groupedIds);
    });
  });

  describe('Helper sortGroupedByTypeIds()', () => {
    it('sorts UKEF ids and return same structure', () => {
      expect(service.sortGroupedByTypeIds(groupedIds)).toEqual(groupedAndSortedIds);
    });
  });

  describe('Helper sortIds()', () => {
    it('sorts UKEF ids in full ukefId entity objects', () => {
      expect(service.sortIds(unSortedUkefIds)).toEqual(sortedUkefIds);
    });
  });
});
