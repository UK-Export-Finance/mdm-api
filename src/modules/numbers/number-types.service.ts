import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NumberType } from './entities/number-type.entity';

@Injectable()
export class NumberTypesService {

  constructor(
    @InjectRepository(NumberType, "mssql-number-generator")
      private readonly numberTypeRepository: Repository<NumberType>,
    ) {}


  async findAll(): Promise<NumberType[]> {
    return this.numberTypeRepository.find();
  }

}
