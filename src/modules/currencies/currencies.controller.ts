import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CurrenciesService } from './currencies.service';
import { CurrencyDto, GetCurrencyExchangeDto } from './dto';
import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyExchangeEntity } from './entities/currency-exchange.entity';

@ApiTags('currencies')
@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all currencies',
  })
  @ApiResponse({
    status: 200,
    description: 'All currencies',
    type: [CurrencyEntity],
  })
  findAll(): Promise<CurrencyEntity[]> {
    return this.currenciesService.findAll();
  }

  @Get('exchange')
  @ApiOperation({
    summary: 'Get the active exchange rate based on source and target exchange rates',
  })
  @ApiResponse({
    status: 200,
    description: 'Active exchange rate',
    type: GetCurrencyExchangeDto,
  })
  findExchangeRate(@Query() query: GetCurrencyExchangeDto): Promise<CurrencyExchangeEntity[]> {
    return this.currenciesService.findExchangeRate(query.source, query.target, query.exchangeRateDate);
  }

  @Get(':isoCode')
  @ApiOperation({
    summary: 'Get a currency details from ISO code',
  })
  @ApiResponse({
    status: 200,
    description: 'Currency details from ISO code',
    type: [CurrencyEntity],
  })
  findOne(@Param() param: CurrencyDto): Promise<CurrencyEntity[]> {
    return this.currenciesService.findOne(param.isoCode);
  }
}
