import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

// TODO
// TODO
// TODO
// TODO - CHECK NAMES ie industry sector / companies house.

@Entity({
  name: 'MAP_INDUSTRY_SECTOR',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class UkefIndustryEntity {
  @PrimaryColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'Code', length: 4 })
  @ApiProperty({
    example: '1406',
    description: 'UKEF industry code',
  })
  code: string;

  @Column({ name: 'Sector', length: 255 })
  @ApiProperty({ example: 'Transportation and storage' })
  sector: string;

  @Column({ name: 'InternalNo' })
  @ApiProperty({
    example: null,
    description: 'This column is not used and is always null',
  })
  internalNo: number;

  @Column({ name: 'Code1', type: 'char', length: 255 })
  @ApiProperty({
    // example: '49200',
    description: 'Companies House Industry sector code',
  })
  code1: string;

  @Column({ name: 'Class ', type: 'char', length: 1000 })
  @ApiProperty({
    example: 'Freight rail transport',
    description: 'Industry class description',
  })
  class: string;

  @Column({ name: 'SECTOR_ID' })
  @ApiProperty({
    example: 14,
    description: 'Industry sector ID',
  })
  sectorId: number;

  @Column({ name: 'SECTOR_NAME', type: 'nvarchar', length: 255 })
  @ApiProperty({
    example: 'CIVIL: TRANSPORT',
    description: 'Industry sector name',
  })
  sectorName: string;

  @Column({ name: 'INDUSTRY_ID' })
  @ApiProperty({
    example: 1007,
    description: 'Industry ID',
  })
  industryId: number;

  @Column({ name: 'INDUSTRY_DESC', type: 'nvarchar', length: 255 })
  @ApiProperty({
    example: 'CIVIL: TRANSPORT MISCELLANOUS',
    description: 'Industry description',
  })
  industryDescription: string;

  @Column({
    name: 'DATE_CREATED_DATETIME',
    type: 'datetime',
  })
  @ApiProperty({
    example: '2017-04-01 00:00:00.000',
    description: 'Date and time the industry was created',
  })
  dateCreated: Date;

  @Column({
    name: 'DATE_LAST_UPDATED_DATETIME',
    type: 'datetime',
  })
  @ApiProperty({
    example: '2017-06-28 11:01:29.040',
    description: 'Date and time the industry was last updated',
  })
  dateLastUpdated: Date;

  @Column({
    name: 'EFFECTIVE_TO_DATETIME',
    type: 'datetime',
  })
  @ApiProperty({
    example: '9999-12-31 00:00:00.000',
    description: 'Date and time the industry is effective to',
  })
  effectiveTo: Date;

  @Column({
    name: 'EFFECTIVE_FROM_DATETIME',
    type: 'datetime',
  })
  @ApiProperty({
    example: '2017-04-01 00:00:00.000',
    description: 'Date and time the industry is effective from',
  })
  effectiveFrom: Date;
}
