import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'country',
  database: 'master_data',
  synchronize: false,
})
export class CountryEntity {
  @PrimaryGeneratedColumn({ name: 'COUNTRY_ID' })
  countryId?: number;

  @Column({ name: 'COUNTRY_NAME' })
  @ApiProperty({ example: 'France', description: 'Name of the Country' })
  countryName: string;

  @Column({ name: 'ISO_CODE' })
  @ApiProperty({ description: 'Alpha-3 code' })
  isoCode: string;

  @Column({ name: 'ISO_2_DIGIT_CODE' })
  @ApiProperty({ description: 'Alpha-2 code' })
  iso2alpha: string;

  @Column({ name: 'DATE_CREATED_DATETIME' })
  @ApiProperty({ description: 'Created' })
  createdDatetime: string;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME' })
  @ApiProperty({ description: 'Updated' })
  lastUpdatedDatetime: Date;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME' })
  @ApiProperty({ description: 'Effective to' })
  effectiveFromDatetime: Date;

  @Column({ name: 'EFFECTIVE_TO_DATETIME' })
  @ApiProperty({ description: 'Effective from' })
  effectiveToDatetime: Date;
}
