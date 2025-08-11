import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class DTFSCustomerDto {
  @ApiProperty({
    description: 'Company registration number',
    example: EXAMPLES.CUSTOMER.COMPANYREG,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(10)
  companyRegistrationNumber: string;

  @ApiProperty({
    description: 'Company name',
    example: EXAMPLES.CUSTOMER.NAME,
  })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({
    description: 'Probability of default',
    example: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  probabilityOfDefault?: number;

  @ApiProperty({
    description: 'UK entity',
    example: EXAMPLES.CUSTOMER.UK_ENTITY,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(3)
  ukEntity?: string;

  @ApiProperty({
    description: 'UKEF industry identifier code',
    example: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  ukefIndustryName?: string;

  @ApiProperty({
    description: 'UKEF industry sector identifier code',
    example: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  ukefSectorName?: string;
}
