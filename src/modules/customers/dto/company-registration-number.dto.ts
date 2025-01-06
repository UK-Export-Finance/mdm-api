import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyRegistrationNumberDto {
  @ApiProperty({ description: 'Company Registration Number' })
  @IsString()
  @IsNotEmpty()
  companyRegistrationNumber: string;
}