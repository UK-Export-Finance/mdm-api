import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'SPI_COEFFICIENT',
  schema: 'dbo',
})
export class ConstantSpiEntity {
  @PrimaryColumn({ name: 'DWD_COEFFICIENT_ID' })
  id: number;

  @Column({
    name: 'COEFFICIENT_CATEGORY',
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value.toString(),
    },
  })
  @ApiProperty({ example: 'A, B, C, Quality of Product, Percentage of Cover' })
  category: string;

  @Column({ name: 'COEFFICIENT_SUB_CATEGORY' })
  @ApiProperty({ example: 'SOV/CCO' })
  subCategory: string;

  @Column({ name: 'OECD_RISK_CATEGORY_CALC' })
  @ApiProperty({ example: '1', description: 'Values are 0 to 7' })
  oecdRiskCategory: string;

  @Column({ name: 'VALUE' })
  @ApiProperty({ example: 0.09 })
  value: number;

  @Column({ name: 'CONST_QUALITY_GRADE' })
  @ApiProperty({ example: 'Above Standard' })
  constQualityGrade: string;

  @Column({ name: 'CONST_REPAYMENT_FREQUENCY' })
  @ApiProperty({ example: 2, description: 'At the moment values is same for all records.' })
  constRepaymentFrequency: number;

  @Column({ name: 'CONST_INTEREST_RATE' })
  @ApiProperty({ example: 4, description: 'At the moment values is same for all records.' })
  constInterestRate: number;
}
