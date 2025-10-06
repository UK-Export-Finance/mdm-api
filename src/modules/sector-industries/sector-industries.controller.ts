import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetSectorIndustriesQueryDto } from './dto/get-sector-industries-query.dto';
import { SectorIndustryEntity } from './entities/sector-industry.entity';
import { SectorIndustriesService } from './sector-industries.service';

@ApiTags('sector-industries')
@Controller('sector-industries')
export class SectorIndustriesController {
  constructor(private readonly sectorIndustriesService: SectorIndustriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get UKEF sectors/industries mapping To ACBS sectors/industries' })
  @ApiResponse({
    status: 200,
    type: [SectorIndustryEntity],
    description: 'UKEF sectors/industries',
  })
  find(@Query() query: GetSectorIndustriesQueryDto): Promise<SectorIndustryEntity[]> {
    return this.sectorIndustriesService.find(query.ukefSectorId, query.ukefIndustryId);
  }
}
