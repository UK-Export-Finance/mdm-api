import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { DATE } from '@ukef/constants';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'DWR_YIELD_RATE',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class YieldRateEntity {
  @PrimaryColumn({ name: 'YIELD_ID' })
  id: number;

  @Column({ name: 'YIELD_RATE_SHORT_NAME' })
  @ApiProperty({ example: 'EUR SWAP (ESTR) 3Y' })
  shortName: string;

  @Column({ name: 'PX_BID_PRICE', type: 'decimal' })
  @ApiProperty({ example: 3.4594 })
  pxBidPrice: number;

  @Column({ name: 'PX_ASK_PRICE', type: 'decimal' })
  @ApiProperty({ example: 3.4706 })
  pxAskPrice: number;

  @Column({ name: 'PX_LAST_PRICE', type: 'decimal' })
  @ApiProperty({ example: 3.465 })
  pxLastPrice: number;

  @Column({ name: 'PX_MID_PRICE', type: 'decimal' })
  @ApiProperty({ example: 3.465 })
  pxMidPrice: number;

  @Column({ name: 'FUTURE_MONTH_YEAR' })
  @ApiProperty({ example: '      ' })
  futureMonthYear: string;

  @Column({ name: 'SOURCE_ERROR_CODE' })
  @ApiProperty({ example: 0 })
  sourceErrorCode: number;

  @Column({ name: 'SOURCE_UPDATE_TIMESTAMP', type: 'timestamp' })
  @ApiProperty({ example: '16:01:08' })
  sourceUpdateTimestamp: string;

  @Column({ name: 'YIELD_INDEX' })
  @ApiProperty({ example: 'EESWE3 Currency' })
  yieldIndex: string;

  @Column({ name: 'DATE_CREATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2023-02-27T16:29:12.93.027Z' })
  created: Date;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2023-02-27T16:29:12.93.027Z' })
  updated: Date;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: DATE.MAXIMUM_TIMEZONE_LIMIT })
  effectiveTo: Date;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2023-02-27T00:00:00.000Z' })
  effectiveFrom: Date;
}
