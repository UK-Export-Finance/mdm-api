import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUkefIdDto } from './dto/create-ukef-id.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UkefId } from './entities/ukef-id.entity';

@Injectable()
export class NumbersService {
  constructor(
    @InjectRepository(UkefId, 'mssql-number-generator')
    private readonly numberRepository: Repository<UkefId>,
  ) {}

  create(createUkefIdDto: CreateUkefIdDto[]): Promise<UkefId[]> {
    // TODO: DB calls are async and will generate IDs that are not in order. Extra code to order ids is required, or calls need to be made in async order.
    // TODO: new IDs of type 1 and 2 could be checked if they are used in ACBS. ACBS might be down, but generation still should work.
    const activeRequests = createUkefIdDto.map((createNumber) => {
      return this.numberRepository
        .query('sp_NUMBER_GENERATOR @0, @1, @2', [createNumber.numberTypeId, createNumber.requestingSystem, createNumber.createdBy])
        .then((postNumberGeneratorResponse) => {
          const ukefIdString = postNumberGeneratorResponse[0].NBR_GENERATED;
          return this.findOne(createNumber.numberTypeId, ukefIdString);
        });
    });

    return Promise.all(activeRequests);
  }

  async findOne(type: number, ukefIdString: string): Promise<UkefId> {
    const dbNumber = await this.numberRepository.query('USP_STP_GET_AUTONUMBER @0, @1', [type, ukefIdString]);
    if (!dbNumber[0]) {
      throw new NotFoundException('UKEF ID is not found');
    }
    return this.mapFieldsFromDbToApi(dbNumber[0]);
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
}
