import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsISO4217CurrencyCode, IsOptional } from 'class-validator';

export class GetCurrencyExchangeDto {
  @ApiProperty({
    example: 'GBP',
    description: 'Source currency for exchange rate - Use ISO 3 alpha currency code standard. Only GBP and USD currencies are supported',
  })
  @IsISO4217CurrencyCode()
  readonly source: string;

  @ApiProperty({
    example: 'AED',
    description: 'Target currency for exchange rate - Use ISO 3 alpha currency code standard',
  })
  @IsISO4217CurrencyCode()
  readonly target: string;

  @ApiProperty({
    example: '2021-01-26',
    description: 'Retrieve the exchange rate for a specific date',
  })
  @IsDateString()
  @IsOptional()
  readonly exchangeRateDate: string;
}
