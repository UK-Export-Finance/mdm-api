import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'DWR_INT_RATE',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class InterestRatesEntity {
  @PrimaryGeneratedColumn({ name: 'INT_RATE_ID' })
  @ApiProperty({ example: 1234 })
  id: number;

  @Column({ name: 'INT_RATE_CATEGORY' })
  @ApiProperty({ example: 'LIBOR', description: 'Interest rate category' })
  category: string;

  @Column({ name: 'INT_RATE_SUB_CATEGORY' })
  @ApiProperty({ example: 'BBALIBOR' })
  subCategory: string;

  @Column({ name: 'INT_RATE_TERM_MONTHS' })
  @ApiProperty({ example: 12 })
  termMonths: number;

  @Column({ name: 'SOURCE_INT_RATE_TERM' })
  @ApiProperty({ example: '12M' })
  sourceTerm: string;

  @Column({ name: 'CURRENCY_ISO_CODE' })
  @ApiProperty({ example: 'EUR' })
  currency: string;

  @Column({ name: 'INTEREST_RATE', type: 'decimal' })
  @ApiProperty({ example: 1.20125 })
  interestRate: number;

  @Column({ name: 'BUK_KEY' })
  @ApiProperty({ example: 'BB1234' })
  bukKey: string;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2023-04-03T00:00:00.000Z' })
  effectiveFrom: Date;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '9999-12-31T00:00:00.000Z' })
  effectiveTo: Date;

  @Column({ name: 'DATE_CREATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2022-03-31T16:30:08.463Z' })
  created: Date;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2022-03-31T16:30:08.463Z' })
  updated: Date;
}
