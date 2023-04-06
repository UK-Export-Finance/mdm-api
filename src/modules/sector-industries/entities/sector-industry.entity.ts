import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'MAP_INDUSTRY_SECTOR',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class SectorIndustryEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({
    name: 'Code',
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value.toString(),
    },
  })
  @ApiProperty({ example: 1001 })
  ukefSectorId: number;

  @Column({
    name: 'Sector',
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value.trim(),
    },
  })
  @ApiProperty({ example: 'Agriculture, Forestry and Fishing' })
  ukefSectorName: string;

  @Column({ name: 'InternalNo' })
  @ApiProperty({ example: null, description: 'Currently all values are null' })
  internalNo: number;

  @Column({
    name: 'Code1',
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value.trim(),
    },
  })
  @ApiProperty({ example: '01140' })
  ukefIndustryId: string;

  @Column({
    name: 'Class',
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value.trim(),
    },
  })
  @ApiProperty({ example: 'Growing of rice' })
  ukefIndustryName: string;

  @Column({
    name: 'SECTOR_ID',
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value.toString(),
    },
  })
  @ApiProperty({ example: '03' })
  acbsSectorId: string;

  @Column({ name: 'SECTOR_NAME' })
  @ApiProperty({ example: 'CIVIL: AGRICULTURE, HORTICULTURE & FISHERIES' })
  acbsSectorName: string;

  @Column({
    name: 'INDUSTRY_ID',
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value.toString().padStart(4, '0'),
    },
  })
  @ApiProperty({ example: '0301' })
  acbsIndustryId: string;

  @Column({ name: 'INDUSTRY_DESC' })
  @ApiProperty({ example: 'AGRICULTURE, HORTICULTURE & FISHERIES' })
  acbsIndustryName: string;

  @Column({ name: 'DATE_CREATED_DATETIME' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  created: Date;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  updated: Date;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  effectiveFrom: Date;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2010-03-15 00:00:00.000' })
  effectiveTo: Date;
}
