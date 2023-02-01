import { Controller, Get, Version, CacheInterceptor, UseInterceptors, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarketsService } from './markets.service';
import { MarketEntity } from './entities/market.entity';
import { CacheTTL } from '@nestjs/common/cache';

@ApiBearerAuth()
@ApiTags('markets')
@Controller('markets')
export class MarketsController {
  constructor(private readonly marketService: MarketsService) {}

  @UseInterceptors(CacheInterceptor)
  @Get()
  @Version('1')
  @ApiParam({
    name: 'active',
    required: false,
    description: 'Optional filtering by field "active"',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all markets (aka countries)',
    type: MarketEntity,
  })
  findAll(@Query("active") active?: string): Promise<MarketEntity[]> {
    return this.marketService.findAllUsingSP(active);
  }
}
