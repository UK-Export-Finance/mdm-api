import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'DWD_CURRENCY_EXCHANGE_RATE',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class CurrencyExchangeEntity {
  @PrimaryGeneratedColumn({ name: 'EXCHANGE_RATE_ID' })
  id: number;

  @Column({ name: 'SOURCE_CURRENCY_ID' })
  @ApiProperty({ example: '12' })
  sourceCurrencyId: string;

  @Column({ name: 'TARGET_CURRENCY_ID' })
  @ApiProperty({ example: '37', description: 'Currency ISO code' })
  targetCurrencyId: string;

  @Column({ name: 'SOURCE_TARGET_CURRENCY_PAIR' })
  @ApiProperty({ example: 'USD-USD X-RATE' })
  currencyPair: number;

  @Column({ name: 'PX_BID_PRICE' })
  @ApiProperty({ example: '1' })
  bidPrice: string;

  @Column({ name: 'PX_ASK_PRICE' })
  @ApiProperty({ example: '1' })
  askPrice: string;

  @Column({ name: 'PX_LAST_PRICE' })
  @ApiProperty({ example: '1' })
  lastPrice: string;

  @Column({ name: 'PX_MID_PRICE' })
  @ApiProperty({ example: '1' })
  midPrice: string;

  @Column({ name: 'SOURCE_ERROR_CODE' })
  @ApiProperty({ example: '0' })
  errorCode: string;

  @Column({ name: 'DATE_CREATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  created: string;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-16 00:00:00.000' })
  updated: string;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  effectiveFrom: string;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-18 00:00:00.000' })
  effectiveTo: string;
}
