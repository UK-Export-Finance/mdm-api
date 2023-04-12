import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'CURRENCY',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class CurrencyEntity {
  @PrimaryGeneratedColumn({ name: 'CURRENCY_ID' })
  @ApiProperty({ example: 221 })
  id: number;

  @Column({ name: 'CURRENCY_DESCRIPTION' })
  @ApiProperty({ example: 'EUROS' })
  name: string;

  @Column({ name: 'CURRENCY_ISO_CODE' })
  @ApiProperty({ example: 'EUR', description: 'Currency ISO code' })
  isoCode: string;

  @Column({ name: 'DATE_CREATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2017-03-06T16:20:17.000Z' })
  created: Date;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2017-03-06T16:20:16.000Z' })
  updated: Date;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2017-03-07T10:44:47.000Z' })
  effectiveFrom: Date;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '9999-12-31T00:00:00.000Z' })
  effectiveTo: Date;

  @Column({ name: 'ACBS_CURRENCY_CODE' })
  @ApiProperty({ example: '9' })
  acbsCode: string;
}
