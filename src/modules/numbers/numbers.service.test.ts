import { jest } from '@jest/globals';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { NumbersService } from './numbers.service';
import { UkefId } from './entities/ukef-id.entity';

describe('NumbersService', () => {
  let service: NumbersService;
  let numberRepository: jest.Mocked<Repository<UkefId>>;

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

  const repositoryMockFactory = jest.fn(() => ({
    query: jest.fn<Repository<UkefId>['query']>(),
  }));

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        NumbersService,
        { provide: PinoLogger, useValue: { info: jest.fn(), error: jest.fn(), warn: jest.fn() } },
        { provide: 'pino-params', useValue: {} },
        ConfigService,
        { provide: 'mssql-number-generator_UkefIdRepository', useFactory: repositoryMockFactory },
      ],
    }).compile();
    service = module.get<NumbersService>(NumbersService);
    numberRepository = module.get<jest.Mocked<Repository<UkefId>>>('mssql-number-generator_UkefIdRepository');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should create UKEF IDs and return sorted result', async () => {
      // Arrange
      const createUkefIdDtos = [
        { numberTypeId: 1, requestingSystem: 'Jest', createdBy: 'Jest test 1' },
        { numberTypeId: 2, requestingSystem: 'Jest', createdBy: 'Jest test 2' },
      ];

      // `create` maps over the dtos and fires all `sp_NUMBER_GENERATOR` queries synchronously before
      // any `.then` (which calls `findOne`) resolves, so the real call order is: gen1, gen2, lookup1, lookup2.
      numberRepository.query
        .mockResolvedValueOnce([{ NBR_GENERATED: '0030000425' }])
        .mockResolvedValueOnce([{ NBR_GENERATED: '0030000426' }])
        .mockResolvedValueOnce([
          {
            DEAL_FACILITY_ID: 20090248,
            DEAL_FACILITY_ID_MASK: '0030000425',
            NBR_TYPE_ID: 1,
            CREATED_BY_USER: 'Jest test 1',
            CREATED_DATETIME: '2023-02-17T11:14:04.977Z',
            REQUESTING_SYSTEM: 'Jest',
          },
        ])
        .mockResolvedValueOnce([
          {
            PARTY_ID: 20090249,
            PARTY_ID_MASK: '0030000426',
            NBR_TYPE_ID: 2,
            CREATED_BY_USER: 'Jest test 2',
            CREATED_DATETIME: '2023-02-17T11:14:04.977Z',
            REQUESTING_SYSTEM: 'Jest',
          },
        ]);

      // Act
      const result = await service.create(createUkefIdDtos);

      // Assert
      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
      expect(numberRepository.query).toHaveBeenCalledTimes(4);

      // Verify generation queries (sp_NUMBER_GENERATOR) are issued first, for both items
      expect(numberRepository.query).toHaveBeenNthCalledWith(1, 'sp_NUMBER_GENERATOR @0, @1, @2', [1, 'Jest', 'Jest test 1']);
      expect(numberRepository.query).toHaveBeenNthCalledWith(2, 'sp_NUMBER_GENERATOR @0, @1, @2', [2, 'Jest', 'Jest test 2']);

      // Verify lookup queries (USP_STP_GET_AUTONUMBER) with generated IDs
      expect(numberRepository.query).toHaveBeenNthCalledWith(3, 'USP_STP_GET_AUTONUMBER @0, @1', [1, '0030000425']);
      expect(numberRepository.query).toHaveBeenNthCalledWith(4, 'USP_STP_GET_AUTONUMBER @0, @1', [2, '0030000426']);

      // Verify returned IDs
      expect(result[0]).toEqual({
        id: 20090248,
        maskedId: '0030000425',
        type: 1,
        createdBy: 'Jest test 1',
        createdDatetime: '2023-02-17T11:14:04.977Z',
        requestingSystem: 'Jest',
      });
      expect(result[1]).toEqual({
        id: 20090249,
        maskedId: '0030000426',
        type: 2,
        createdBy: 'Jest test 2',
        createdDatetime: '2023-02-17T11:14:04.977Z',
        requestingSystem: 'Jest',
      });
    });

    it('should throw error when query fails', async () => {
      // Arrange
      const createUkefIdDtos = [{ numberTypeId: 1, requestingSystem: 'Jest', createdBy: 'Jest test 1' }];
      const error = new Error('Database error');

      numberRepository.query.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(service.create(createUkefIdDtos)).rejects.toThrow('Error creating new UKEF ID(s)');
    });

    it('should preserve NotFoundException from findOne', async () => {
      // Arrange
      const createUkefIdDtos = [{ numberTypeId: 1, requestingSystem: 'Jest', createdBy: 'Jest test 1' }];

      numberRepository.query.mockResolvedValueOnce([{ NBR_GENERATED: '0030000425' }]).mockResolvedValueOnce([]); // findOne returns empty, throws NotFoundException

      // Act & Assert
      await expect(service.create(createUkefIdDtos)).rejects.toThrow(NotFoundException);
    });

    it('should preserve BadRequestException from findOne', async () => {
      // Arrange
      const createUkefIdDtos = [{ numberTypeId: 999, requestingSystem: 'Jest', createdBy: 'Jest test 1' }];

      numberRepository.query.mockResolvedValueOnce([{ NBR_GENERATED: '0030000425' }]).mockResolvedValueOnce([{ ERR: 'INVALID NUMBER TYPE' }]); // findOne finds invalid type

      // Act & Assert
      await expect(service.create(createUkefIdDtos)).rejects.toThrow(BadRequestException);
    });

    it('should preserve InternalServerErrorException from findOne', async () => {
      // Arrange
      const createUkefIdDtos = [{ numberTypeId: 1, requestingSystem: 'Jest', createdBy: 'Jest test 1' }];

      numberRepository.query.mockResolvedValueOnce([{ NBR_GENERATED: '0030000425' }]).mockRejectedValueOnce(new Error('Unexpected database error')); // findOne query fails unexpectedly

      // Act & Assert
      await expect(service.create(createUkefIdDtos)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('findOne', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return mapped UKEF ID', async () => {
      // Arrange
      const dbRecord = {
        DEAL_FACILITY_ID: 20090248,
        DEAL_FACILITY_ID_MASK: '0030000425',
        NBR_TYPE_ID: 1,
        CREATED_BY_USER: 'Jest',
        CREATED_DATETIME: '2023-02-17T11:14:04.977Z',
        REQUESTING_SYSTEM: 'Jest 1 - Deal',
      };

      numberRepository.query.mockResolvedValueOnce([dbRecord]);

      // Act
      const result = await service.findOne(1, '0030000425');

      // Assert
      expect(result).toEqual({
        id: 20090248,
        maskedId: '0030000425',
        type: 1,
        createdBy: 'Jest',
        createdDatetime: '2023-02-17T11:14:04.977Z',
        requestingSystem: 'Jest 1 - Deal',
      });
    });

    it('should throw NotFoundException when UKEF ID is not found', async () => {
      // Arrange
      numberRepository.query.mockResolvedValueOnce([]);

      // Act & Assert
      await expect(service.findOne(1, 'INVALID')).rejects.toBeInstanceOf(NotFoundException);
    });

    it('should throw BadRequestException for invalid UKEF ID type', async () => {
      // Arrange
      const dbRecord = { ERR: 'INVALID NUMBER TYPE' };
      numberRepository.query.mockResolvedValueOnce([dbRecord]);

      // Act & Assert
      await expect(service.findOne(999, 'INVALID')).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should throw InternalServerErrorException for unexpected errors', async () => {
      // Arrange
      numberRepository.query.mockRejectedValueOnce(new Error('Unexpected error'));

      // Act & Assert
      await expect(service.findOne(1, '0030000425')).rejects.toBeInstanceOf(InternalServerErrorException);
    });
  });

  describe('mapFieldsFromDbToApi', () => {
    it('should rename fields', () => {
      // Arrange
      const dbRecord = {
        DEAL_FACILITY_ID: 20090248,
        DEAL_FACILITY_ID_MASK: '0030000425',
        NBR_TYPE_ID: 1,
        CREATED_BY_USER: 'Jest',
        CREATED_DATETIME: '2023-02-17T11:14:04.977Z',
        REQUESTING_SYSTEM: 'Jest 1 - Deal',
      };
      const expectedUkefId = {
        id: 20090248,
        maskedId: '0030000425',
        type: 1,
        createdBy: 'Jest',
        createdDatetime: '2023-02-17T11:14:04.977Z',
        requestingSystem: 'Jest 1 - Deal',
      };

      // Act
      const result = service.mapFieldsFromDbToApi(dbRecord);

      // Assert
      expect(result).toEqual(expectedUkefId);
    });
  });

  describe('groupIdsByType', () => {
    it('should group array items', () => {
      // Act
      const result = service.groupIdsByType(unSortedUkefIds);

      // Assert
      expect(result).toEqual(groupedIds);
    });
  });

  describe('sortGroupedByTypeIds', () => {
    it('should sort UKEF IDs and return same structure', () => {
      // Act
      const result = service.sortGroupedByTypeIds(groupedIds);

      // Assert
      expect(result).toEqual(groupedAndSortedIds);
    });
  });

  describe('sortIds', () => {
    it('should sort UKEF IDs in full ukefId entity objects', () => {
      // Act
      const result = service.sortIds(unSortedUkefIds);

      // Assert
      expect(result).toEqual(sortedUkefIds);
    });
  });
});
