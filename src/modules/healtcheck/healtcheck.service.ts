import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketEntity } from '../markets/entities/market.entity';
import { UkefNumber as Number } from '../numbers/entities/number.entity';

@Injectable()
export class HealtcheckService {

  constructor(
    @InjectRepository(Number, "mssql-number-generator")
      private readonly numberRepository: Repository<Number>,
    @InjectRepository(MarketEntity, "mssql-cis")
      private readonly marketsRepository: Repository<MarketEntity>,
    ) {}

  async checkAllDatabases(): Promise<any> {
    let checks = {
      'number-generator': JSON.stringify(await this.numberRepository.query('SELECT 1')) === '[{"":1}]'? 'online': 'offline',
      'cis': JSON.stringify(await this.marketsRepository.query('SELECT 1')) === '[{"":1}]'? 'online': 'offline'
    }
    return checks;
  }
  
  // test
  async triggerTestSqlError(): Promise<any> {
    await this.numberRepository.query("TRIGGER SQL ERROR");
    return "All error should be thrown";
  }
}
