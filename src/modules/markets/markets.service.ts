import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { DATABASE_NAME } from '@ukef/constants';
import { DbResponseHelper } from '@ukef/helpers/db-response.helper';

import { MarketEntity } from './entities/market.entity';

@Injectable()
export class MarketsService {
  constructor(
    @InjectRepository(MarketEntity, DATABASE_NAME.CIS)
    private readonly marketsRepository: Repository<MarketEntity>,
    private readonly logger: PinoLogger,
  ) {}

  async find(active?: string, search?: string): Promise<MarketEntity[]> {
    try {
      let results = await this.marketsRepository.query('CIS_USP_READ_MARKETS');

      if (active) {
        if (active === 'Y') {
          results = results.filter((market: { ACTIVE_IND: string }) => market.ACTIVE_IND === 'Y');
        } else {
          results = results.filter((market: { ACTIVE_IND: string }) => market.ACTIVE_IND !== 'Y');
        }
      }

      if (search) {
        const searchLowerCase = search.toLowerCase();
        results = results.filter(
          (market: { COUNTRY_NAME: string; ISO_CODE: string }) =>
            market.COUNTRY_NAME.toLowerCase().includes(searchLowerCase) || market.ISO_CODE.toLowerCase().includes(searchLowerCase),
        );
      }

      const fieldMap = DbResponseHelper.getApiNameToDbNameMap(this.marketsRepository);
      const renamedFields = DbResponseHelper.renameDbResultFields(this.marketsRepository, fieldMap, results);

      const mappedResults = renamedFields.map((market: any) => ({
        ...market,
        oecdRiskCategory: parseInt(market.oecdRiskCategory.replace(/\D/g, ''), 10),
      }));

      return mappedResults;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
