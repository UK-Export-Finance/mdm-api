import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE, REDACT_STRINGS, REDACT_STRING_PATHS } from '@ukef/constants';
import { DbResponseHelper } from '@ukef/helpers/db-response.helper';
import { Repository } from 'typeorm';

import { MarketEntity } from './entities/market.entity';
import { PinoLogger } from 'nestjs-pino';
import { redactError } from '@ukef/helpers/redact-errors.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MarketsService {

  constructor(
    @InjectRepository(MarketEntity, DATABASE.CIS)
    private readonly marketsRepository: Repository<MarketEntity>,
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
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
    } catch (err: any) {
      this.logger.error(redactError(this.config.get<boolean>('app.redactLogs'), REDACT_STRING_PATHS, REDACT_STRINGS, err));
      throw new InternalServerErrorException();
    }
  }
}
