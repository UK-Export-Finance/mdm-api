import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerSalesforceResponseDto {
  @ApiProperty({ description: 'id' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ description: 'errors' })
  @IsArray()
  @IsNotEmpty()
  errors: any[];

  @ApiProperty({ description: 'success' })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;
}
