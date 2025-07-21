import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ExposurePeriodDto } from './dto/exposure-period.dto';
import { GetExposurePeriodQueryDto } from './dto/get-exposure-period-query.dto';
import { ExposurePeriodService } from './exposure-period.service';

@ApiTags('exposure-period')
@Controller('exposure-period')
export class ExposurePeriodController {
  constructor(private readonly exposurePeriodService: ExposurePeriodService) {}

  @Get()
  @ApiOperation({ summary: 'Calculate exposure period in months' })
  @ApiResponse({
    status: 200,
    description: 'Calculated exposure period',
    type: ExposurePeriodDto,
  })
  find(@Query() query: GetExposurePeriodQueryDto): Promise<ExposurePeriodDto> {
    return this.exposurePeriodService.calculate(query.startdate, query.enddate, query.productgroup);
  }
}
