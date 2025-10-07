import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { InterestRatesEntity } from './entities/interest-rate.entity';
import { InterestRatesService } from './interest-rates.service';

@ApiTags('interest-rates')
@Controller('interest-rates')
export class InterestRatesController {
  constructor(private readonly interestRatesService: InterestRatesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all Interest rates',
  })
  @ApiResponse({
    status: 200,
    description: 'Active Interest rates',
    type: [InterestRatesEntity],
  })
  findAll(): Promise<InterestRatesEntity[]> {
    return this.interestRatesService.findAll();
  }
}
