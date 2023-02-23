import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { InterestRatesEntity } from './entities/interest-rate.entity';
import { InterestRatesService } from './interest-rates.service';

@ApiTags('interest-rates')
@Controller('interest-rates')
export class InterestRatesController {
  constructor(private readonly interestRatesService: InterestRatesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [InterestRatesEntity],
  })
  findAll(): Promise<InterestRatesEntity[]> {
    return this.interestRatesService.findAll();
  }
}
