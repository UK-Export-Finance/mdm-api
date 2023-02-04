import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketEntity } from './entities/market.entity';
import { DbResponseHelper } from '../../helpers/db-response.helper';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(MarketEntity, 'mssql-cis')
    private readonly marketsRepository: Repository<MarketEntity>,
  ) {}

  async findAll(active?: string): Promise<MarketEntity[]> {
    let spResults = await this.marketsRepository.query('CIS_USP_READ_MARKETS');

    if (active) {
      if (active === 'true') {
        spResults = spResults.filter((results) => results.ACTIVE_IND === 'Y');
      } else {
        spResults = spResults.filter((results) => results.ACTIVE_IND !== 'Y');
      }
    }

    const fieldMap = DbResponseHelper.getApiNameToDbNameMap(this.marketsRepository);

    const renamedResults = DbResponseHelper.renameDbResultFields(this.marketsRepository, fieldMap, spResults);

    return renamedResults;
  }
}
