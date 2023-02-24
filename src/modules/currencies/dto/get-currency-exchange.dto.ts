import { ApiProperty } from '@nestjs/swagger';
import { IsISO4217CurrencyCode } from 'class-validator';

export class GetCurrencyExchangeDto {
  @IsISO4217CurrencyCode()
  @ApiProperty({ example: 'GBP' })
  readonly source: string;

  @IsISO4217CurrencyCode()
  @ApiProperty({ example: 'AED' })
  readonly target: string;
}
