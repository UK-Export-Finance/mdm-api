import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'CURRENCY',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class CurrencyEntity {
  @PrimaryGeneratedColumn({ name: 'CURRENCY_ID' })
  id: number;

  @Column({ name: 'CURRENCY_DESCRIPTION' })
  @ApiProperty({ example: 'EUROS' })
  name: string;

  @Column({ name: 'CURRENCY_ISO_CODE' })
  @ApiProperty({ example: 'EUR', description: 'Currency ISO code' })
  isoCode: string;

  @Column({ name: 'DATE_CREATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 16:13:34.000' })
  @Transform(({ value }) => format(value, "yyyy-MM-dd'T'HH:mm:ss"))
  created: number;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  @Transform(({ value }) => format(value, "yyyy-MM-dd'T'HH:mm:ss"))
  updated: string;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  @Transform(({ value }) => format(value, "yyyy-MM-dd'T'HH:mm:ss"))
  effectiveFrom: string;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  @Transform(({ value }) => format(value, "yyyy-MM-dd'T'HH:mm:ss"))
  effectiveTo: string;

  @Column({ name: 'ACBS_CURRENCY_CODE' })
  @ApiProperty({ example: '9' })
  acbsCode: string;
}
