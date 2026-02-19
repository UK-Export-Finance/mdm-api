import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE_NAME, DATE } from '@ukef/constants';
import { DbResponseHelper } from '@ukef/helpers/db-response.helper';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, Equal, Repository } from 'typeorm';

import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyExchangeEntity } from './entities/currency-exchange.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @InjectRepository(CurrencyEntity, DATABASE_NAME.MDM)
    private readonly currency: Repository<CurrencyEntity>,
    @InjectRepository(CurrencyExchangeEntity, DATABASE_NAME.CEDAR)
    private readonly currencyExchange: DataSource,
    @InjectRepository(CurrencyExchangeEntity, DATABASE_NAME.CEDAR)
    private readonly currencyExchangeRepository: Repository<CurrencyExchangeEntity>,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find all currencies
   *
   * @returns {Promise<CurrencyEntity[]>}
   */
  async findAll(): Promise<CurrencyEntity[]> {
    try {
      const result = await this.currency.find({ order: { id: 'ASC' } });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Find a single currency
   *
   * @param {string} isoCode - The currency ISO code
   * @returns {Promise<CurrencyEntity>}
   */
  async findOne(isoCode: string): Promise<CurrencyEntity[]> {
    try {
      const results = await this.currency.find({
        where: { effectiveTo: Equal(new Date(DATE.MAXIMUM_LIMIT)), isoCode },
        order: { id: 'ASC' },
      });

      if (!results.length) {
        throw new NotFoundException('No results found');
      }

      return results;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Find an exchange rate
   *
   * @param {string} source - The exchange rate source
   * @param {string} target - The exchange rate target
   * @param {string} exchangeRateDate - Optional exchange rate date
   * @returns {Promise<CurrencyExchangeEntity[]>}
   */
  async findExchangeRate(source: string, target: string, exchangeRateDate?: string): Promise<CurrencyExchangeEntity[]> {
    try {
      const results = await this.currencyExchange.query('USP_READ_CURRENCY_EXCHANGE_RATE @0, @1, @2', [source, target, exchangeRateDate]);

      if (!results.length) {
        throw new NotFoundException('The selected exchange rate is not available');
      }

      const fieldMap = DbResponseHelper.getApiNameToDbNameMap(this.currencyExchangeRepository);
      const renamedResults = DbResponseHelper.renameDbResultFields(this.currencyExchangeRepository, fieldMap, results);

      return renamedResults;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
