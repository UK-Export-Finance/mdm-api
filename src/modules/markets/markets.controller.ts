import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { MarketsQueryDto } from './dto/markets-query.dto';
import { MarketEntity } from './entities/market.entity';
import { MarketsService } from './markets.service';

@ApiTags('markets')
@Controller('markets')
export class MarketsController {
  constructor(private readonly marketService: MarketsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all markets (aka countries)',
    type: MarketEntity,
  })
  findAll(@Query() query: MarketsQueryDto): Promise<MarketEntity[]> {
    return this.marketService.findAll(query.active);
  }
}
