import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DTFSCustomerDto {
  @ApiProperty({ description: 'Company Registration Number' })
  @IsString()
  @IsNotEmpty()
  companyRegistrationNumber: string;

  @ApiProperty({ description: 'Company Name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;
}
