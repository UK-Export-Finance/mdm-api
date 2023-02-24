import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'DWD_CURRENCY_EXCHANGE_RATE',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class CurrencyExchangeEntity {
  @PrimaryGeneratedColumn({ name: 'EXCHANGE_RATE_ID' })
  id: number;

  @Column({ name: 'SOURCE_CURRENCY_ID' })
  @ApiProperty({ example: 'EUROS' })
  sourceCurrencyId: string;

  @Column({ name: 'TARGET_CURRENCY_ID' })
  @ApiProperty({ example: 'EUR', description: 'Currency ISO code' })
  targetCurrencyId: string;

  @Column({ name: 'SOURCE_TARGET_CURRENCY_PAIR', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 16:13:34.000' })
  currencyPair: number;

  @Column({ name: 'PX_BID_PRICE', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  bidPrice: string;

  @Column({ name: 'PX_ASK_PRICE', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  askPrice: string;

  @Column({ name: 'PX_LAST_PRICE', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  lastPrice: string;

  @Column({ name: 'PX_MID_PRICE', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  midPrice: string;

  @Column({ name: 'SOURCE_ERROR_CODE', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  errorCode: string;

  @Column({ name: 'DATE_CREATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  created: string;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  updated: string;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  effectiveTo: string;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  effectiveFrom: string;
}
