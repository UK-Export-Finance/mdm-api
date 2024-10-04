import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Account Name' })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiProperty({ description: 'Trading Country' })
  @IsString()
  @IsNotEmpty()
  BillingCountry: string;
  
  @ApiProperty({ description: 'Trading Street' })
  @IsString()
  @IsNotEmpty()
  BillingStreet: string;

  @ApiProperty({ description: 'Trading City' })
  @IsString()
  @IsNotEmpty()
  BillingCity: string;

  @ApiProperty({ description: 'Trading Zip/Postal Code' })
  @IsString()
  @IsNotEmpty()
  BillingPostalCode: string;

  @ApiProperty({ description: 'D&B Number' })
  @IsString()
  @IsNotEmpty()
  D_B_Number__c: string;
  
  @ApiProperty({ description: 'Company Registration Number' })
  @IsString()
  @IsNotEmpty()
  Company_Registration_Number__c: string;
}
