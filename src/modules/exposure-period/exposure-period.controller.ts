import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ExposurePeriodDto } from './dto/exposure-period.dto';
import { GetExposurePeriodQueryDto } from './dto/get-exposure-period-query.dto';
import { ExposurePeriodService } from './exposure-period.service';

@ApiBearerAuth()
@ApiTags('exposure-period')
@Controller('exposure-period')
export class ExposurePeriodController {
  constructor(private readonly exposurePeriodService: ExposurePeriodService) {}

  @Get()
  @ApiOperation({ summary: 'Calculate exposure period in months.' })
  @ApiResponse({
    status: 200,
    description: 'Calculated exposure period',
    type: ExposurePeriodDto,
  })
  @ApiParam({
    name: 'startdate',
    required: false,
    type: 'date',
    description: 'Guarantee commencement date for a facility',
    example: '2017-07-04',
  })
  @ApiParam({
    name: 'enddate',
    type: 'date',
    required: false,
    description: 'Guarantee expiry date for a facility',
    example: '2018-07-04',
  })
  @ApiParam({
    name: 'productgroup',
    type: 'string',
    required: false,
    description: 'Facility type. It can be EW or BS',
    example: 'EW',
  })
  find(@Query() query: GetExposurePeriodQueryDto): Promise<ExposurePeriodDto> {
    return this.exposurePeriodService.calculate(query.startdate, query.enddate, query.productgroup);
  }
}
