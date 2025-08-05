import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class DTFSCustomerDto {
  @ApiProperty({ description: 'Company registration number', minLength: 8, maxLength: 10 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(10)
  companyRegistrationNumber: string;

  @ApiProperty({ description: 'Company name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: 'Probability of default' })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  probabilityOfDefault?: number;

  @ApiProperty({ description: 'UK entity' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1)
  ukEntity?: string;

  @ApiProperty({ description: 'UKEF industry identifier' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(4)
  ukefIndustryId?: string;

  @ApiProperty({ description: 'UKEF industry sector identifier' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(3)
  ukefSectorId?: string;
}
