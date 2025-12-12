import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'CREDIT_RISK_RATING',
  schema: 'dbo',
})
@UseInterceptors(ClassSerializerInterceptor)
export class CreditRiskRatingEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  @ApiProperty({ example: 1 })
  id: number;

  @Column({ name: 'CREDIT_RISK_RATING_ID' })
  @ApiProperty({ example: 1 })
  name: number;

  @Column({ name: 'CREDIT_RISK_RATING_DESCRIPTION' })
  @ApiProperty({ example: 'AA+', description: 'Credit risk rating description' })
  description: string;

  @Column({ name: 'DATE_CREATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2017-03-06T16:20:17.000Z' })
  createdAt: Date;

  @Column({ name: 'DATE_LAST_UPDATED_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2017-03-06T16:20:17.000Z' })
  updatedAt: Date;

  @Column({ name: 'EFFECTIVE_FROM_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '2017-03-06T10:44:47.000Z' })
  effectiveFrom: Date;

  @Column({ name: 'EFFECTIVE_TO_DATETIME', type: 'timestamp' })
  @ApiProperty({ example: '9999-03-0 216T16:20:17.000Z' })
  effectiveTo: Date;
}
