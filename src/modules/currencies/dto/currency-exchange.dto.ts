import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsISO4217CurrencyCode, IsOptional } from 'class-validator';

export class GetCurrencyExchangeDto {
  @IsISO4217CurrencyCode()
  @ApiProperty({
    example: 'GBP',
    description: 'Source currency for exchange rate - Use ISO 3 alpha currency code standard. Only GBP and USD currencies are supported',
  })
  readonly source: string;

  @IsISO4217CurrencyCode()
  @ApiProperty({
    example: 'AED',
    description: 'Target currency for exchange rate - Use ISO 3 alpha currency code standard',
  })
  readonly target: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({
    example: '2021-01-26',
    description: 'Retrieve the exchange rate for a specific date',
  })
  readonly exchangeRateDate: string;
}
