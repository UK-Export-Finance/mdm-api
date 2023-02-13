import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max } from 'class-validator';

export class CreateUkefIdDto {
  @IsInt()
  @IsNotEmpty()
  @Max(9)
  @ApiProperty({ example: 1 })
  readonly numberTypeId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'ECGD\\jsmith', description: 'User if it is known' })
  readonly createdBy: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'NodeJs/App' })
  readonly requestingSystem: string;
}
