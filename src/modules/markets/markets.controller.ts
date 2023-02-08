import { Controller, Get, Query, ParseBoolPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarketsService } from './markets.service';
import { MarketEntity } from './entities/market.entity';

@ApiBearerAuth()
@ApiTags('markets')
@Controller('markets')
export class MarketsController {
  constructor(private readonly marketService: MarketsService) {}

  @Get()
  @ApiParam({
    name: 'active',
    type: 'boolean',
    required: false,
    description: 'Optional filtering by field "active"',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all markets (aka countries)',
    type: MarketEntity,
  })
  findAll(@Query('active') active?: string): Promise<MarketEntity[]> {
    // TODO: active could be boolean, but we need to support optional (undefined) state to return active and not active markets.
    return this.marketService.findAll(active);
  }
}
