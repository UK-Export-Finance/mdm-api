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
  @ApiProperty({ example: 221 })
  id: number;

  @Column({ name: 'SOURCE_CURRENCY_ID' })
  @ApiProperty({ example: 12 })
  sourceCurrencyId: number;

  @Column({ name: 'TARGET_CURRENCY_ID' })
  @ApiProperty({ example: 37, description: 'Currency ISO code' })
  targetCurrencyId: number;

  @Column({ name: 'SOURCE_TARGET_CURRENCY_PAIR' })
  @ApiProperty({ example: 'USD-USD X-RATE' })
  currencyPair: string;

  @Column({ name: 'PX_BID_PRICE' })
  @ApiProperty({ example: 1 })
  bidPrice: number;

  @Column({ name: 'PX_ASK_PRICE' })
  @ApiProperty({ example: 1 })
  askPrice: number;

  @Column({ name: 'PX_LAST_PRICE' })
  @ApiProperty({ example: 1 })
  lastPrice: number;

  @Column({ name: 'PX_MID_PRICE' })
  @ApiProperty({ example: 1 })
  midPrice: number;

  @Column({ name: 'DATE_CREATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2021-01-26T16:21:25.000Z' })
  created: Date;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2021-01-27T16:21:32.000Z' })
  updated: Date;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2021-01-26T00:00:00.000Z' })
  effectiveFrom: Date;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2021-01-26T23:59:59.000Z' })
  effectiveTo: Date;
}
