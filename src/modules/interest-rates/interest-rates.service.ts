import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATE } from '@ukef/constants';
import { Equal, Repository } from 'typeorm';

import { InterestRatesEntity } from './entities/interest-rate.entity';

@Injectable()
export class InterestRatesService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(InterestRatesEntity, 'mssql-cedar')
    private readonly interestRates: Repository<InterestRatesEntity>,
  ) {}

  findAll(): Promise<InterestRatesEntity[]> {
    try {
      return this.interestRates.find({ where: { effectiveTo: Equal(DATE.MAXIMUM_LIMIT) } });
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
