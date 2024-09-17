import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerSalesforceResponseDto {
  @ApiProperty({ description: 'id' })
  @IsString()
  @IsNotEmpty()
  id: string;
  
  @ApiProperty({ description: 'errors' })
  @IsString()
  @IsNotEmpty()
  errors: any[];

    
  @ApiProperty({ description: 'success' })
  @IsBoolean()
  @IsNotEmpty()
  success: boolean;
}
