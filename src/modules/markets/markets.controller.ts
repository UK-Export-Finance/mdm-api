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
  async findAll(@Query() query: MarketsQueryDto): Promise<MarketEntity[]> {
    const results = await this.marketService.findAll(query.active);
    const mappedResults = results.map((market: any) => ({
      ...market,
      oecdRiskCategory: parseInt(market.oecdRiskCategory.replace(/\D/g, ''), 10),
    }));
    return mappedResults;
  }
}
