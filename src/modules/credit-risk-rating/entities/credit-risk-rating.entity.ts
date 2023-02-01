import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({
  name: 'credit_risk_rating',
  database: 'MASTER_DATA',
  schema: 'dbo',
  synchronize: false,
})
export class CreditRiskRatingEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  @Exclude()
  id?: number;

  @Column({ name: 'CREDIT_RISK_RATING_ID' })
  @ApiProperty({ description: 'Rating Id' })
  @Expose()
  creditRiskRatingId: number;

  @Column({ name: 'CREDIT_RISK_RATING_DESCRIPTION' })
  @ApiProperty({ description: 'Credit risk rating description' })
  creditRiskRatingDescription: string;

  @Column({ name: 'DATE_CREATED_DATETIME' })
  @ApiProperty({ description: 'Date created' })
  @Exclude()
  dateCreated: string;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME' })
  @ApiProperty({ description: 'Date last updated' })
  @Exclude()
  lastUpdated: string;

  @Column({ name: 'EFFECTIVE_TO_DATETIME' })
  @ApiProperty({ description: 'Effective to' })
  effectiveTo: Date;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME' })
  @ApiProperty({ description: 'Effective from' })
  effectiveFrom: Date;
}
