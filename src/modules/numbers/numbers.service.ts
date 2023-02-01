import { Injectable, NotFoundException} from '@nestjs/common';
import { CreateNumberDto } from './dto/create-number.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UkefNumber as Number } from './entities/number.entity';

@Injectable()
export class NumbersService {

  constructor(
    @InjectRepository(Number, "mssql-number-generator")
      private readonly numberRepository: Repository<Number>,
    ) {}

  async create(createNumbers: CreateNumberDto[]): Promise<Number[]> {
    let results = []
    let ids = []
    for (let i in createNumbers) {
      let createNumber = createNumbers[i];
      ids.push({
        'numberTypeId': createNumber.numberTypeId,
        'maskedId': this.numberRepository.query('sp_NUMBER_GENERATOR @0, @1, @2', [createNumber.numberTypeId, createNumber.requestingSystem, createNumber.createdBy])
      });
    }

    for (let i in ids) {
      let maskedId = await ids[i].maskedId;
      maskedId = maskedId[0].NBR_GENERATED;
      let ukefNumber = await this.findOne(ids[i].numberTypeId, maskedId);
      results.push(ukefNumber);
    }
    //Promise.all(results);
    return results;
  }

  async findOne(typeID: number, ukefID: string): Promise<Number> {
    const dbNumber = await this.numberRepository.query('USP_STP_GET_AUTONUMBER @0, @1', [typeID, ukefID])
    if (!dbNumber[0]) {
      throw new NotFoundException('UKEF id is not found');
    }
    return this.mapFieldsFromDbToApi(dbNumber[0]);
  }


  /**
   * Helper function to rename Stored Procedure response fields
   */
  mapFieldsFromDbToApi(dbNumber: any): Number {
    return {
      id: dbNumber[Object.keys(dbNumber)[0]], // First and second field name is different depending on number type.
      maskedId: dbNumber[Object.keys(dbNumber)[1]],
      numberTypeId: dbNumber.NBR_TYPE_ID,
      createdBy: dbNumber.CREATED_BY_USER,
      createdDatetime: dbNumber.CREATED_DATETIME,
      requestingSystem: dbNumber.REQUESTING_SYSTEM
    };
  }
}
