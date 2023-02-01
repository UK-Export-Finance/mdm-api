// class-validator is part of swagger.
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNumberDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({example: 1})
  readonly numberTypeId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'ECGD\\jsmith', description: 'User if it is known'})
  readonly createdBy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'NodeJs/App'})
  readonly requestingSystem: string;
}
