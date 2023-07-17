import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE, REDACT_STRINGS, REDACT_STRING_PATHS } from '@ukef/constants';
import { Repository } from 'typeorm';

import { CreateUkefIdDto } from './dto/create-ukef-id.dto';
import { UkefId } from './entities/ukef-id.entity';
import { PinoLogger } from 'nestjs-pino';
import { redactError } from '@ukef/helpers/redact-errors.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NumbersService {

  constructor(
    @InjectRepository(UkefId, DATABASE.NUMBER_GENERATOR)
    private readonly numberRepository: Repository<UkefId>,
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
  ) {}

  async create(createUkefIdDto: CreateUkefIdDto[]): Promise<UkefId[]> {
    // TODO: new IDs of type 1 and 2 could be checked if they are used in ACBS. ACBS might be down, but generation still should work.
    const activeRequests = createUkefIdDto.map((createNumber) => {
      return this.numberRepository
        .query('sp_NUMBER_GENERATOR @0, @1, @2', [createNumber.numberTypeId, createNumber.requestingSystem, createNumber.createdBy])
        .then((postNumberGeneratorResponse) => {
          const ukefIdString = postNumberGeneratorResponse[0].NBR_GENERATED;
          return this.findOne(createNumber.numberTypeId, ukefIdString);
        });
    });
    const newIds = await Promise.all(activeRequests);
    const sortedNewIds = this.sortIds(newIds);

    return sortedNewIds;
  }

  async findOne(type: number, ukefIdString: string): Promise<UkefId> {
    try {
      const dbNumber = await this.numberRepository.query('USP_STP_GET_AUTONUMBER @0, @1', [type, ukefIdString]);
      if (!dbNumber.length) {
        throw new NotFoundException('UKEF ID is not found');
      }
      if (dbNumber[0]?.ERR === 'INVALID NUMBER TYPE') {
        throw new BadRequestException('Invalid UKEF ID type');
      }
      return this.mapFieldsFromDbToApi(dbNumber[0]);
    } catch (err) {
      if (err instanceof NotFoundException || err instanceof BadRequestException) {
        this.logger.warn(redactError(this.config.get<boolean>('app.redactLogs'), REDACT_STRING_PATHS, REDACT_STRINGS, err));
        throw err;
      } else {
        this.logger.error(redactError(this.config.get<boolean>('app.redactLogs'), REDACT_STRING_PATHS, REDACT_STRINGS, err));
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Helper function to rename Stored Procedure response fields
   */
  mapFieldsFromDbToApi(dbNumber: any): UkefId {
    return {
      id: dbNumber[Object.keys(dbNumber)[0]], // First and second field name is different depending on UkefId type.
      maskedId: dbNumber[Object.keys(dbNumber)[1]],
      type: dbNumber.NBR_TYPE_ID,
      createdBy: dbNumber.CREATED_BY_USER,
      createdDatetime: dbNumber.CREATED_DATETIME,
      requestingSystem: dbNumber.REQUESTING_SYSTEM,
    };
  }

  /**
   * Helper to sort new ids
   */
  sortIds(newUkefIds: UkefId[]): UkefId[] {
    const sortedIds = [];
    const newIdsByType = this.groupIdsByType(newUkefIds);
    const sortednewIdsByType = this.sortGroupedByTypeIds(newIdsByType);

    // Keep result objects order, but ensure field maskedId is sorted.
    newUkefIds.forEach((newId) => {
      newId['maskedId'] = sortednewIdsByType[newId['type']].shift();
      sortedIds.push(newId);
    });
    return sortedIds;
  }

  /**
   * Helper to sort new Ids inside type array.
   */
  sortGroupedByTypeIds(newIdsByType: unknown): unknown {
    return Object.entries(newIdsByType).reduce((acc, typeWithIds) => {
      acc[typeWithIds[0]] = typeWithIds[1].sort();
      return acc;
    }, Object.create(null));
  }

  /**
   * Helper to group ids by type, so they can be sorted.
   */
  groupIdsByType(newUkefIds: UkefId[]): unknown {
    return newUkefIds.reduce(function (acc, newUkefId) {
      acc[newUkefId.type] = acc[newUkefId.type] || []; //Reasign or initialize
      acc[newUkefId.type].push(newUkefId.maskedId);
      return acc;
    }, Object.create(null));
  }
}
