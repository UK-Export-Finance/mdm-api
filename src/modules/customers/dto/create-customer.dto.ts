import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Account Name' })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiProperty({ description: 'Party URN' })
  @IsString()
  @IsNotEmpty()
  Party_URN__c: string;

  @ApiProperty({ description: 'D&B Number', minLength: 9, maxLength: 9 })
  @IsString()
  @IsNotEmpty()
  @Length(9)
  D_B_Number__c: string;

  @ApiProperty({ description: 'Companies House Number', minLength: 8, maxLength: 10 })
  @IsString()
  @IsNotEmpty()
  @Length(8, 10)
  Company_Registration_Number__c: string;
}
