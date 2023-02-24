import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrenciesService } from './currencies.service';
import { GetCurrencyExchangeDto } from './dto/get-currency-exchange.dto';
import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyExchangeEntity } from './entities/currency-exchange.entity';

@ApiBearerAuth()
@ApiTags('currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all currencies',
  })
  findAll(): Promise<CurrencyEntity[]> {
    return this.currenciesService.findAll();
  }

  @Get('exchange')
  @ApiOperation({
    summary: 'Get the Active exchange rate based on the provided source and target exchange rates. Query parameters are mandatory for this endpoint.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get the Active exchange rate',
    type: GetCurrencyExchangeDto,
  })
  @ApiParam({
    name: 'source',
    required: true,
    type: 'string',
    description: 'The source currency for exchange rate - Use ISO 3 alpha currency code standard',
    example: 'GBP',
  })
  @ApiParam({
    name: 'target',
    required: true,
    type: 'string',
    description: 'The target currency for exchange rate - Use ISO 3 alpha currency code standard',
    example: 'AED',
  })
  @ApiParam({
    name: 'exchangeRateDate',
    required: false,
    type: 'string',
    description: 'retrieve the exchange rate for a specific date',
    example: '2021-01-26',
  })
  findCurrencyExchange(@Query() query: GetCurrencyExchangeDto): Promise<CurrencyExchangeEntity[]> {
    return this.currenciesService.findOneExchange(query.source, query.target, query.exchangeRateDate);
  }

  @ApiResponse({
    status: 200,
    description: 'Get currency by ISO Code',
  })
  @Get(':isoCode')
  findOne(@Param('isoCode') isoCode: string): Promise<CurrencyEntity[]> {
    return this.currenciesService.findOne(isoCode);
  }
}
