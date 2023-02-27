import { ApiProperty } from '@nestjs/swagger';
import { IsISO4217CurrencyCode } from 'class-validator';

export class CurrencyDto {
  @IsISO4217CurrencyCode()
  @ApiProperty({ example: 'GBP' })
  public isoCode: string;
}
