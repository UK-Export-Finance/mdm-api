import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Account name',
    example: EXAMPLES.CUSTOMER.NAME,
  })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiProperty({
    description: 'Party URN',
    example: EXAMPLES.CUSTOMER.PARTYURN,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  Party_URN__c: string;

  @ApiProperty({
    description: 'D&B number',
    example: EXAMPLES.CUSTOMER.DNB_NUMBER,
  })
  @IsString()
  @IsNotEmpty()
  @Length(9)
  D_B_Number__c: string;

  @ApiProperty({
    description: 'Companies house number',
    example: EXAMPLES.CUSTOMER.COMPANYREG,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(10)
  Company_Registration_Number__c: string;

  @ApiProperty({
    description: 'Credit risk rating',
    example: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING,
  })
  @IsString()
  @IsNotEmpty()
  CCM_Credit_Risk_Rating__c: string;

  @ApiProperty({
    description: 'Credit risk rating date (YYYY-MM-DD)',
    example: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING_DATE,
  })
  @IsString()
  @Length(10)
  @IsNotEmpty()
  CCM_Credit_Risk_Rating_Date__c: string;

  @ApiProperty({
    description: 'Loss given default',
    example: EXAMPLES.CUSTOMER.LOSS_GIVEN_DEFAULT,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  CCM_Loss_Given_Default__c: number;

  @ApiProperty({
    description: 'Probability of default',
    example: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
  })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  CCM_Probability_of_Default__c?: number;

  @ApiProperty({
    description: 'UK entity',
    example: EXAMPLES.CUSTOMER.UK_ENTITY,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(3)
  CCM_Citizenship_Class__c?: string;

  @ApiProperty({
    description: 'UKEF industry identifier',
    example: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  CCM_Primary_Industry__c?: string;

  @ApiProperty({
    description: 'UKEF industry sector identifier',
    example: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  CCM_Primary_Industry_Group__c?: string;
}
