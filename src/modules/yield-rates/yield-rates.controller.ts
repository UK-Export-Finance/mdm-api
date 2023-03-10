import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetYieldRatesQueryDto } from './dto/get-yield-rates-query.dto';
import { YieldRateEntity } from './entities/yield-rate.entity';
import { YieldRatesService } from './yield-rates.service';

@ApiTags('yield-rates')
@Controller('yield-rates')
export class YieldRatesController {
  constructor(private readonly yieldRatesService: YieldRatesService) {}

  @Get()
  @ApiOperation({ summary: 'Yield rates are updated daily from bloomberg.' })
  @ApiResponse({
    status: 200,
    type: [YieldRateEntity],
  })
  find(@Query() query: GetYieldRatesQueryDto): Promise<YieldRateEntity[]> {
    return this.yieldRatesService.find(query.searchDate);
  }
}
