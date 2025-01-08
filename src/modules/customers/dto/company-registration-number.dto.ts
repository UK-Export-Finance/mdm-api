import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CompanyRegistrationNumberDto {
  @ApiProperty({
    description: 'Company Registration Number',
    minLength: 8,
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 10)
  companyRegistrationNumber: string;
}
