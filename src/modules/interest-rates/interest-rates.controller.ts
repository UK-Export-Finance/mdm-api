import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { InterestRatesEntity } from './entities/interest-rate.entity';
import { InterestRatesService } from './interest-rates.service';

@Controller('interest-rates')
export class InterestRatesController {
  constructor(private readonly interestRatesService: InterestRatesService) {}

  @Get()
  findAll(): Promise<InterestRatesEntity[]> {
    return this.interestRatesService.findAll();
  }
}
