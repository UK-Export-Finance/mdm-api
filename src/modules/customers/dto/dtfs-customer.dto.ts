import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class DTFSCustomerDto {
  @ApiProperty({ description: 'Company Registration Number', minLength: 8, maxLength: 10 })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(10)
  companyRegistrationNumber: string;

  @ApiProperty({ description: 'Company Name' })
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiProperty({ description: 'Probability of Default' })
  @IsNumber()
  @IsNotEmpty()
  probabilityOfDefault: number;
}
