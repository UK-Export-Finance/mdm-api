import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';
import { DbResponseHelper } from '@ukef/helpers/db-response.helper';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { MarketEntity } from './entities/market.entity';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(MarketEntity, DATABASE.CIS)
    private readonly marketsRepository: Repository<MarketEntity>,
    private readonly logger: PinoLogger,
  ) {}

  async find(active?: string, search?: string): Promise<MarketEntity[]> {
    try {
      let results = await this.marketsRepository.query('CIS_USP_READ_MARKETS');

      if (active) {
        if (active === 'Y') {
          results = results.filter((results: { ACTIVE_IND: string }) => results.ACTIVE_IND === 'Y');
        } else {
          results = results.filter((results: { ACTIVE_IND: string }) => results.ACTIVE_IND !== 'Y');
        }
      }

      if (search) {
        const searchLowerCase = search.toLowerCase();
        results = results.filter(
          (results: { COUNTRY_NAME: string; ISO_CODE: string }) =>
            results.COUNTRY_NAME.toLowerCase().indexOf(searchLowerCase) !== -1 || results.ISO_CODE.toLowerCase().indexOf(searchLowerCase) !== -1,
        );
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
