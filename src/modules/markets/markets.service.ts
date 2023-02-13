import { DbResponseHelper } from '@mdm/helpers/db-response.helper';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MarketEntity } from './entities/market.entity';

@Injectable()
export class MarketsService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(MarketEntity, 'mssql-cis')
    private readonly marketsRepository: Repository<MarketEntity>,
  ) {}

  async findAll(active?: string): Promise<MarketEntity[]> {
    try {
      let spResults = await this.marketsRepository.query('CIS_USP_READ_MARKETS');

      if (active) {
        if (active === 'Y') {
          spResults = spResults.filter((results) => results.ACTIVE_IND === 'Y');
        } else {
          spResults = spResults.filter((results) => results.ACTIVE_IND !== 'Y');
        }
      }

      const fieldMap = DbResponseHelper.getApiNameToDbNameMap(this.marketsRepository);

      const renamedResults = DbResponseHelper.renameDbResultFields(this.marketsRepository, fieldMap, spResults);

      return renamedResults;
    } catch (err) {
      // We need to log original error or it will be lost.
      this.logger.error(err);
      // Return generic 500.
      throw new InternalServerErrorException();
    }
  }
}
