import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Account Name' })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiProperty({ description: 'Party URN', maxLength: 10 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  Party_URN__c: string;

  @ApiProperty({ description: 'D&B Number', minLength: 9, maxLength: 9 })
  @IsString()
  @IsNotEmpty()
  @Length(9)
  D_B_Number__c: string;

  @ApiProperty({ description: 'Companies House Number', minLength: 8, maxLength: 10 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(10)
  Company_Registration_Number__c: string;

  @ApiProperty({ description: 'Credit Risk Rating' })
  @IsString()
  @IsNotEmpty()
  CCM_Credit_Risk_Rating__c: string;

  @ApiProperty({ description: 'Credit Risk Rating Date' })
  @IsString()
  @IsNotEmpty()
  CCM_Credit_Risk_Rating_Date__c: string;

  @ApiProperty({ description: 'Loss Given Default' })
  @IsNumber()
  @IsNotEmpty()
  CCM_Loss_Given_Default__c: number;

  @ApiProperty({ description: 'Probability of Default' })
  @IsNumber()
  @IsNotEmpty()
  CCM_Probability_of_Default__c: number;
}
