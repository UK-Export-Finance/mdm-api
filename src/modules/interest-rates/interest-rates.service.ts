import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE, DATE, REDACT_STRING_PATHS, REDACT_STRINGS } from '@ukef/constants';
import { redactError } from '@ukef/helpers/redact-errors.helper';
import { PinoLogger } from 'nestjs-pino';
import { Equal, Repository } from 'typeorm';

import { InterestRatesEntity } from './entities/interest-rate.entity';

@Injectable()
export class InterestRatesService {
  constructor(
    @InjectRepository(InterestRatesEntity, DATABASE.CEDAR)
    private readonly interestRates: Repository<InterestRatesEntity>,
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
  ) {}

  findAll(): Promise<InterestRatesEntity[]> {
    try {
      return this.interestRates.find({ where: { effectiveTo: Equal(new Date(DATE.MAXIMUM_LIMIT)) } });
    } catch (err) {
      this.logger.error(redactError(this.config.get<boolean>('app.redactLogs'), REDACT_STRING_PATHS, REDACT_STRINGS, err));
      throw new InternalServerErrorException();
    }
  }
}
