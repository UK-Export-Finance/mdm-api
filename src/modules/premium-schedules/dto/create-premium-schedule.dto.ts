import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreatePremiumScheduleDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 10588388, description: 'Can be BS or EW' })
  readonly facilityURN: number;

  @IsString()
  @IsNotEmpty()
  @Length(2, 2)
  @ApiProperty({ example: 'BS', description: 'Can be BS or EW' })
  readonly productGroup: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'Premium type concerns how we are being paid... In Arrears, In advance or one lump sum. See MASTER_DATA.dbo.WF_PREMIUM_TYPE',
  })
  readonly premiumTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'length of each exposure period. Monthly, Quarterly, semi- Annual or Annual. See MASTER_DATA.dbo.WF_PREMIUM_FREQUENCY',
  })
  readonly premiumFrequencyId: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2021-01-19', description: 'Start date' })
  readonly guaranteeCommencementDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2022-05-17', description: 'End date' })
  readonly guaranteeExpiryDate: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 80, description: 'percentage covered, expecting whole number i.e. if 90% expecting the number 90' })
  readonly guaranteePercentage: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1.35, description: 'UKEF Fee percentage, expecting whole number i.e. if 90% expecting the number 90' })
  readonly guaranteeFeePercentage: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3)
  @ApiProperty({ example: '360', description: '360 or 365.  UK or US calendar' })
  readonly dayBasis: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 16, description: 'How many periods are we exposed to the risk, This is pre-calculated in the Exposure Period Calc' })
  readonly exposurePeriod: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: null, description: 'Optional EWCS Exposure ONLY, this is the cumulative amount drawn on the first disbursement. NULL if not EWCS' })
  readonly cumulativeAmount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 40000, description: 'Required for BS Exposure' })
  readonly maximumLiability: number;
}
