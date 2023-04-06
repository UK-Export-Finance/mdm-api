import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { MarketsQueryDto } from './dto/markets-query.dto';
import { MarketEntity } from './entities/market.entity';
import { MarketsService } from './markets.service';

@ApiTags('markets')
@Controller('markets')
export class MarketsController {
  constructor(private readonly marketService: MarketsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all markets (aka countries)',
  })
  @ApiResponse({
    status: 200,
    description: 'All markets',
    type: MarketEntity,
  })
  findAll(@Query() query: MarketsQueryDto): Promise<MarketEntity[]> {
    return this.marketService.findAll(query.active);
  }
}
