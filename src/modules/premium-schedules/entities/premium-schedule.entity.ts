import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'INCOME_EXPOSURE',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class PremiumScheduleEntity {
  @PrimaryColumn({ name: 'D_INCOME_EXPOSURE_ID' })
  id: number;

  @Column({ name: 'FACILITY_ID' })
  @ApiProperty({
    example: '30000425',
    description: 'UKEF ID for Facility, but without 00 at beginning',
  })
  facilityURN: string;

  // Date only.
  @Column({ name: 'CALCULATION_DATE', type: 'date' })
  @ApiProperty({ example: '2023-02-27' })
  calculationDate: Date;

  @Column({ name: 'INCOME', type: 'decimal' })
  @ApiProperty({ example: 465.0 })
  income: number;

  @Column({ name: 'INCOME_PER_DAY', type: 'decimal' })
  @ApiProperty({ example: 15.0 })
  incomePerDay: number;

  @Column({ name: 'EXPOSURE', type: 'decimal' })
  @ApiProperty({ example: 400000.0 })
  exposure: number;

  @Column({ name: 'PERIOD' })
  @ApiProperty({ example: 1 })
  period: number;

  @Column({ name: 'DAYS_IN_PERIOD' })
  @ApiProperty({ example: 31 })
  daysInPeriod: number;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2023-02-27T00:00:00.000Z' })
  effectiveFrom: Date;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2023-02-27T00:00:00.000Z' })
  effectiveTo: string;

  @Column({ name: 'DATE_CREATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2023-02-27T00:00:00.000Z' })
  created: Date;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2023-02-27T00:00:00.000Z' })
  updated: Date;

  @Column({ name: 'CURRENT_INDICATOR' })
  @ApiProperty({ example: 'Y', description: 'Can be Y or N. Not active records are just for record tracking. Just active records will be returned.' })
  isActive: string;
}
