import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ConstantsService } from './constants.service';
import { GetConstantsSpiQueryDto } from './dto/get-constants-spi-query.dto';
import { ConstantSpiEntity } from './entities/constants-spi.entity';

@ApiTags('constants')
@Controller('constants')
export class ConstantsController {
  constructor(private readonly constantsService: ConstantsService) {}

  @Get('spi')
  @ApiOperation({ summary: 'Get constants required for SPI website to calculate indicative sovereign premium rate' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [ConstantSpiEntity],
  })
  find(@Query() query: GetConstantsSpiQueryDto): Promise<ConstantSpiEntity[]> {
    return this.constantsService.find(query.oecdRiskCategory, query.category);
  }
}
