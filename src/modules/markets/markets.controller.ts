import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetMarketsDto } from './dto/get-markets.dto';
import { MarketsQueryDto } from './dto/markets-query.dto';
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
    type: GetMarketsDto,
  })
  async findAll(@Query() query: MarketsQueryDto): Promise<GetMarketsDto[]> {
    const results: GetMarketsDto[] = await this.marketService.findAll(query.active);
    const mappedResults: GetMarketsDto[] = results.map((market: any) => ({
      ...market,
      oecdRiskCategory: parseInt(market.oecdRiskCategory.replace(/\D/g, ''), 10),
    }));
    return mappedResults;
  }
}
