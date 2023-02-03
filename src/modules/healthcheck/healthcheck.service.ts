import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketEntity } from '../markets/entities/market.entity';
import { UkefId } from '../numbers/entities/ukef-id.entity';

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
  async triggerTestSqlError(): Promise<string> {
    await this.numberRepository.query('TRIGGER SQL ERROR');
    return 'An error should be thrown';
  }
}
