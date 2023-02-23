import { Controller, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ConstantsService } from './constants.service';
import { GetConstantsSpiQueryDto } from './dto/get-constants-spi-query.dto';
import { ConstantSpiEntity } from './entities/constants-spi.entity';

@ApiBearerAuth()
@ApiTags('constants')
@Controller('constants')
export class ConstantsController {
  constructor(private readonly constantsService: ConstantsService) {}

  @Get('spi')
  @ApiOperation({ summary: 'Get constants required for SPI website to calculate indicative sovereign premium rate' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ConstantSpiEntity,
  })
  @ApiParam({
    name: 'oecdRiskCategory',
    required: false,
    type: 'int',
    description: 'Country risk category',
    example: 1,
  })
  @ApiParam({
    name: 'category',
    type: 'string',
    required: false,
    description: 'Constant category/type/group',
    example: ['C', 'Quality of Product'],
  })
  find(@Query() query: GetConstantsSpiQueryDto): Promise<ConstantSpiEntity[]> {
    return this.constantsService.find(query.oecdRiskCategory, query.category);
  }
}
