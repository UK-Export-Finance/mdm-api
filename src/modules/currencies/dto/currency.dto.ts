import { ApiProperty } from '@nestjs/swagger';
import { IsISO4217CurrencyCode } from 'class-validator';

export class CurrencyDto {
  @ApiProperty({ example: 'GBP', description: 'ISO Code' })
  @IsISO4217CurrencyCode()
  public isoCode: string;
}
