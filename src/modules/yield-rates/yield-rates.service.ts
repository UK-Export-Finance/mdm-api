import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE_NAME, DATE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { Equal, LessThanOrEqual, MoreThan, Repository } from 'typeorm';

import { YieldRateEntity } from './entities/yield-rate.entity';

@Injectable()
export class YieldRatesService {
  constructor(
    @InjectRepository(YieldRateEntity, DATABASE_NAME.CEDAR)
    private readonly yieldRateRepository: Repository<YieldRateEntity>,
    private readonly logger: PinoLogger,
  ) {}

  async find(searchDate: string): Promise<YieldRateEntity[]> {
    try {
      // Search by date or use standard max date to get active/current rates.
      const query: object = searchDate
        ? { effectiveTo: MoreThan(searchDate), effectiveFrom: LessThanOrEqual(searchDate) }
        : { effectiveTo: Equal(DATE.MAXIMUM_LIMIT) };

      const results = await this.yieldRateRepository.find({
        where: query,
      });
      if (!results.length) {
        throw new NotFoundException('No Yield rates found');
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
}
