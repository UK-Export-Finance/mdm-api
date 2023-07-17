import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE, DATE, REDACT_STRINGS, REDACT_STRING_PATHS } from '@ukef/constants';
import { Equal, LessThanOrEqual, MoreThan, Repository } from 'typeorm';

import { YieldRateEntity } from './entities/yield-rate.entity';
import { PinoLogger } from 'nestjs-pino';
import { redactError } from '@ukef/helpers/redact-errors.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YieldRatesService {
  constructor(
    @InjectRepository(YieldRateEntity, DATABASE.CEDAR)
    private readonly yieldRateRepository: Repository<YieldRateEntity>,
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
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
        this.logger.warn(redactError(this.config.get<boolean>('app.redactLogs'), REDACT_STRING_PATHS, REDACT_STRINGS, err));
        throw err;
      } else {
        this.logger.error(redactError(this.config.get<boolean>('app.redactLogs'), REDACT_STRING_PATHS, REDACT_STRINGS, err));
        throw new InternalServerErrorException();
      }
    }
  }
}
