import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Account name' })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiProperty({ description: 'Party URN', maxLength: 10 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  Party_URN__c: string;

  @ApiProperty({ description: 'D&B number', minLength: 9, maxLength: 9 })
  @IsString()
  @IsNotEmpty()
  @Length(9)
  D_B_Number__c: string;

  @ApiProperty({ description: 'Companies house number', minLength: 8, maxLength: 10 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(10)
  Company_Registration_Number__c: string;

  @ApiProperty({ description: 'Credit risk rating' })
  @IsString()
  @IsNotEmpty()
  CCM_Credit_Risk_Rating__c: string;

  @ApiProperty({ description: 'Credit risk rating date (YYYY-MM-DD)' })
  @IsString()
  @Length(10)
  @IsNotEmpty()
  CCM_Credit_Risk_Rating_Date__c: string;

  @ApiProperty({ description: 'Loss given default' })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  CCM_Loss_Given_Default__c: number;

  @ApiProperty({ description: 'Probability of default' })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  CCM_Probability_of_Default__c?: number;

  @ApiProperty({ description: 'UK entity' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(3)
  CCM_Citizenship_Class__c?: string;

  @ApiProperty({ description: 'UKEF industry identifier' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  CCM_Primary_Industry__c?: string;

  @ApiProperty({ description: 'UKEF industry sector identifier' })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  CCM_Primary_Industry_Group__c?: string;
}
