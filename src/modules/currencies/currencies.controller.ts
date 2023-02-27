import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrenciesService } from './currencies.service';
import { CurrencyDto, GetCurrencyExchangeDto } from './dto';
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
    summary: 'Get the Active exchange rate based on source and target exchange rates. Query parameters are mandatory for this endpoint.',
  })
  @ApiResponse({
    status: 200,
    description: 'Get the Active exchange rate',
    type: GetCurrencyExchangeDto,
  })
  @ApiQuery({
    name: 'source',
    required: true,
    type: 'string',
    description: 'Source currency for exchange rate - Use ISO 3 alpha currency code standard. Only GBP and USD currencies are supported',
    example: 'GBP',
  })
  @ApiQuery({
    name: 'target',
    required: true,
    type: 'string',
    description: 'Target currency for exchange rate - Use ISO 3 alpha currency code standard',
    example: 'AED',
  })
  @ApiQuery({
    name: 'exchangeRateDate',
    required: false,
    type: 'string',
    description: 'Retrieve the exchange rate for a specific date',
    example: '2021-01-26',
  })
  findExchangeRate(@Query() query: GetCurrencyExchangeDto): Promise<CurrencyExchangeEntity[]> {
    return this.currenciesService.findExchangeRate(query.source, query.target, query.exchangeRateDate);
  }

  @Get(':isoCode')
  @ApiOperation({
    summary: 'Get the currency details based on ISO Code',
  })
  @ApiResponse({
    status: 200,
    description: 'Currency details based on ISO Code',
    type: [CurrencyEntity],
  })
  @ApiParam({
    name: 'isoCode',
    required: true,
    type: 'string',
    description: 'ISO Code',
    example: 'GBP',
  })
  findOne(@Param() param: CurrencyDto): Promise<CurrencyEntity[]> {
    return this.currenciesService.findOne(param.isoCode);
  }
}
