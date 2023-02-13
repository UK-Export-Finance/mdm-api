import { MarketEntity } from '@mdm/module/markets/entities/market.entity';
import { UkefId } from '@mdm/module/numbers/entities/ukef-id.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HealthcheckService {
  constructor(
    @InjectRepository(UkefId, 'mssql-number-generator')
    private readonly numberRepository: Repository<UkefId>,
    @InjectRepository(MarketEntity, 'mssql-cis')
    private readonly marketsRepository: Repository<MarketEntity>,
  ) {}

  async checkAllDatabases(): Promise<object> {
    const checks = {
      'number-generator': JSON.stringify(await this.numberRepository.query('SELECT 1')) === '[{"":1}]' ? 'online' : 'offline',
      cis: JSON.stringify(await this.marketsRepository.query('SELECT 1')) === '[{"":1}]' ? 'online' : 'offline',
    };
    return checks;
  }

  // test
  triggerTestSqlError(): Promise<string> {
    // TODO: fix error handling and loging for this and similar DB errors.
    return this.numberRepository.query('TRIGGER SQL ERROR');
  }
}
