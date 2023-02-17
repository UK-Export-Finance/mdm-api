import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InterestRatesEntity } from './entities/interest-rate.entity';

@Injectable()
export class InterestRatesService {
  constructor(
    @InjectRepository(InterestRatesEntity, 'mssql-cis')
    private readonly interestRates: Repository<InterestRatesEntity>,
  ) {}

  async findAll() {
    try {
      const response = await this.interestRates.find();
      return response;
    } catch (error) {
      console.info(error);
    }
  }
}
