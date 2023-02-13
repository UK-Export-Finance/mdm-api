import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'ODS_MARKETS',
  database: 'cis',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
// We don't have DB column names because SP is used.
export class MarketEntity {
  @PrimaryColumn({ name: 'COUNTRY_ID' })
  marketId?: number;

  @Column({ name: 'COUNTRY_NAME' })
  @ApiProperty({ example: 'Algeria', description: 'Name of the Market/Country' })
  marketName: string;

  @Column({ name: 'ISO_CODE' })
  @ApiProperty({ example: 'DZA' })
  isoCode: string;

  @Column({ name: 'DATE_CREATED' })
  @ApiProperty({ example: '2021-11-09T09:39:31.000Z', description: 'Created' })
  createdDatetime: string;

  @Column({ name: 'DATE_UPDATED' })
  @ApiProperty({ example: '2021-11-09T09:39:31.000Z', description: 'Updated' })
  lastUpdatedDatetime: Date;

  @Column({ name: 'EFFECTIVE_TO_DATE' })
  @ApiProperty({ example: '2021-11-09T09:39:31.000Z', description: 'Effective to' })
  effectiveFromDatetime: Date;

  @Column({ name: 'EFFECTIVE_FROM_DATE' })
  @ApiProperty({ example: '9999-12-31T00:00:00.000Z', description: 'Effective from' })
  effectiveToDatetime: Date;

  @Column({ name: 'OECD_RISK_CATEGORY_DESC' })
  @ApiProperty({ example: 5, description: '' })
  oecdRiskCategory: number;

  @Column({ name: 'MARKET_RISK_APPETITE_PUBLIC_DESC' })
  @ApiProperty({ example: 'At least £4bn', description: '' })
  marketRiskAppetitePublicDesc: string;

  @Column({ name: 'GEOGRAPHICAL_REGION_ID' })
  @ApiProperty({ example: 14, description: '' })
  geographicalRegionId: number;

  @Column({ name: 'GEOGRAPHICAL_REGION_DESC' })
  @ApiProperty({ example: 'Middle East & North Africa', description: '' })
  geographicalRegionDesc: string;

  @Column({ name: 'SOVEREIGN_RISK_PROVISION' })
  @ApiProperty({ example: 0, description: '' })
  sovereignRiskProvision: number;

  @Column({ name: 'ESRA_ID' })
  @ApiProperty({ example: 1, description: '' })
  ESRAClassificationId: number; // TODO: Once live, Notify Tony of the typo update

  @Column({ name: 'ESRA_DESC' })
  @ApiProperty({ example: 'Standard Risk', description: '' })
  ESRAClassificationDesc: string; // TODO: Once live, Notify Tony of the typo update

  @Column({ name: 'CASH_COVER_AVAILABILITY_ID' })
  @ApiProperty({ example: 1, description: '' })
  shortTermCoverAvailabilityId: number;

  @Column({ name: 'CASH_COVER_AVAILABILITY_DESC' })
  @ApiProperty({ example: 'Yes', description: '' })
  shortTermCoverAvailabilityDesc: string;

  @Column({ name: 'NBI_ISSUE' })
  @ApiProperty({ example: 'Y', description: '' })
  NBIIssue: string;

  @Column({ name: 'ACTIVE_IND' })
  @ApiProperty({ example: 'Y', description: 'Markets might be not active, filter with query parameter "active"' })
  active: string;
}
