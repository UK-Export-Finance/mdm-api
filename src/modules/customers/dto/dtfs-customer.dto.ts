import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

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
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  probabilityOfDefault: number;
}
