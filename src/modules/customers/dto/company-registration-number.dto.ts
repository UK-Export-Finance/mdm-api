import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CompanyRegistrationNumberDto {
  @ApiProperty({
    description: 'Company Registration Number',
    minLength: 8,
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(10)
  companyRegistrationNumber: string;
}
