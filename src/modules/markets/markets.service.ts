import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';
import { DbResponseHelper } from '@ukef/helpers/db-response.helper';
import { Repository } from 'typeorm';

import { MarketEntity } from './entities/market.entity';

@Injectable()
export class MarketsService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(MarketEntity, DATABASE.CIS)
    private readonly marketsRepository: Repository<MarketEntity>,
  ) {}

  async findAll(active?: string): Promise<MarketEntity[]> {
    try {
      let spResults = await this.marketsRepository.query('CIS_USP_READ_MARKETS');

      if (active) {
        if (active === 'Y') {
          spResults = spResults.filter((results: { ACTIVE_IND: string }) => results.ACTIVE_IND === 'Y');
        } else {
          spResults = spResults.filter((results: { ACTIVE_IND: string }) => results.ACTIVE_IND !== 'Y');
        }
      }

      const fieldMap = DbResponseHelper.getApiNameToDbNameMap(this.marketsRepository);

      const renamedResults = DbResponseHelper.renameDbResultFields(this.marketsRepository, fieldMap, spResults);

      return renamedResults;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
