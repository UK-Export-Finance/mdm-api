import { ApiProperty } from '@nestjs/swagger';
import { ENUMS } from '@ukef/constants';
import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class CreatePremiumScheduleDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 30000425,
    description: 'UKEF id for Facility, but without 00 at beginning. Usually UKEF id is string, but in this endpoint it is number',
  })
  readonly facilityURN: number;

  @IsString()
  @IsNotEmpty()
  @Length(2)
  @IsEnum(ENUMS.PRODUCTS)
  @ApiProperty({ example: 'BS', description: 'Two products are accepted: EW and BS' })
  readonly productGroup: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(3)
  @ApiProperty({
    example: 1,
    description: 'Premium type concerns how we are being paid. It can be: 1 -> In advance, 2 -> In Arrears or 3-> At Maturity.',
  })
  readonly premiumTypeId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(4)
  @ApiProperty({
    example: 1,
    description: 'Payment frequency. It can be: 0 -> Null (At maturity), 1 -> Monthly, 2 -> Quarterly, 3-> Semi-annually or 4 -> Annually',
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
  @ApiProperty({ example: 80, description: 'Percentage covered, expecting whole number i.e. if 90% expecting the number 90' })
  readonly guaranteePercentage: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1.35, description: 'UKEF Fee percentage, expecting whole number i.e. if 90% expecting the number 90' })
  readonly guaranteeFeePercentage: number;

  @IsString()
  @IsNotEmpty()
  @Length(3)
  @ApiProperty({ example: '360', description: '360 or 365. UK or US calendar' })
  readonly dayBasis: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 16, description: 'How many periods are we exposed to the risk, This is pre-calculated in the Exposure Period Calc' })
  readonly exposurePeriod: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
    example: null,
    description: 'Optional EWCS Exposure ONLY, this is the cumulative amount drawn on the first disbursement. NULL if not EWCS',
  })
  readonly cumulativeAmount: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 40000, description: 'Required for BS Exposure' })
  readonly maximumLiability: number;
}
