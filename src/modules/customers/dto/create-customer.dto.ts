import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Account Name' })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiProperty({ description: 'Party URN' })
  @IsString()
  @IsNotEmpty()
  Party_URN__c: string;

  @ApiProperty({ description: 'D&B Number' })
  @IsString()
  @IsNotEmpty()
  D_B_Number__c: string;

  @ApiProperty({ description: 'Companies House Number' })
  @IsString()
  @IsNotEmpty()
  Company_Registration_Number__c: string;
}