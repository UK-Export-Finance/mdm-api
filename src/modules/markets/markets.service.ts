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
      let results = await this.marketsRepository.query('CIS_USP_READ_MARKETS');

      if (active) {
        if (active === 'Y') {
          results = results.filter((results: { ACTIVE_IND: string }) => results.ACTIVE_IND === 'Y');
        } else {
          results = results.filter((results: { ACTIVE_IND: string }) => results.ACTIVE_IND !== 'Y');
        }
      }

      const fieldMap = DbResponseHelper.getApiNameToDbNameMap(this.marketsRepository);
      const renamedFields = DbResponseHelper.renameDbResultFields(this.marketsRepository, fieldMap, results);

      const mappedResults = renamedFields.map((market: any) => ({
        ...market,
        oecdRiskCategory: parseInt(market.oecdRiskCategory.replace(/\D/g, ''), 10),
      }));

      return mappedResults;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
