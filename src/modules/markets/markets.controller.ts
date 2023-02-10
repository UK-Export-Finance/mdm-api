import { Controller, Get, Query, ParseBoolPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MarketsService } from './markets.service';
import { MarketEntity } from './entities/market.entity';
import { QueryParamActiveEnum } from './dto/query-param-active-enum';
import { MarketsQueryDto } from './dto/markets-query.dto';

@ApiBearerAuth()
@ApiTags('markets')
@Controller('markets')
export class MarketsController {
  constructor(private readonly marketService: MarketsService) {}

  @Get()
  @ApiParam({
    name: 'active',
    type: 'string',
    required: false,
    description: 'Optional filtering by field "active". If parameter is not provided result will include active and not active markets',
    enum: QueryParamActiveEnum,
  })
  @ApiResponse({
    status: 200,
    description: 'Get all markets (aka countries)',
    type: MarketEntity,
  })
  findAll(@Query() query: MarketsQueryDto): Promise<MarketEntity[]> {
    return this.marketService.findAll(query.active);
  }
}
