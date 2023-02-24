import { ApiProperty } from '@nestjs/swagger';
import { IsISO4217CurrencyCode, IsString } from 'class-validator';

export class GetCurrencyExchangeDto {
  @IsISO4217CurrencyCode()
  @ApiProperty({ example: 'GBP' })
  readonly source: string;

  @IsISO4217CurrencyCode()
  @ApiProperty({ example: 'AED' })
  readonly target: string;

  @IsString()
  @ApiProperty({ example: '2021-01-26' })
  readonly exchangeRateDate: string;
}
