import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATE } from '@ukef/constants';
import { DbResponseHelper } from '@ukef/helpers/db-response.helper';
import { DataSource, Equal, Repository } from 'typeorm';

import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyExchangeEntity } from './entities/currency-exchange.entity';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(CurrencyEntity, 'mssql-mdm')
    private readonly currency: Repository<CurrencyEntity>,
    @InjectRepository(CurrencyExchangeEntity, 'mssql-cedar')
    private readonly currencyExchange: DataSource,
    @InjectRepository(CurrencyExchangeEntity, 'mssql-cedar')
    private readonly currencyExchangeRepository: Repository<CurrencyExchangeEntity>,
  ) {}

  findAll(): Promise<CurrencyEntity[]> {
    try {
      return this.currency.find({ order: { id: 'ASC' } });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
  async findOne(isoCode: string): Promise<CurrencyEntity[]> {
    try {
      const results = await this.currency.find({
        where: { effectiveTo: Equal(DATE.MAXIMUM_LIMIT), isoCode },
        order: { id: 'ASC' },
      });

      if (!results.length) {
        throw new NotFoundException('No results found');
      }

      return results;
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.warn(err);
        throw err;
      } else {
        this.logger.error(err);
        throw new InternalServerErrorException();
      }
    }
  }

  async findOneExchange(source: string, target: string, exchangeRateDate?: string): Promise<CurrencyExchangeEntity[]> {
    try {
      const results = await this.currencyExchange.query('USP_READ_CURRENCY_EXCHANGE_RATE @0, @1, @2', [source, target, exchangeRateDate]);

      if (!results.length) {
        throw new NotFoundException('The selected exchange rate is not available');
      }

      const fieldMap = DbResponseHelper.getApiNameToDbNameMap(this.currencyExchangeRepository);
      const renamedResults = DbResponseHelper.renameDbResultFields(this.currencyExchangeRepository, fieldMap, results);

      // Transform results to match logic in old implementation.
      const transformedResults = renamedResults.map((result) => {
        if (result.category === result.subCategory) result.subCategory = '';
        return result;
      });

      return transformedResults;
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.warn(err);
        throw err;
      } else {
        this.logger.error(err);
        throw new InternalServerErrorException();
      }
    }
  }
}
