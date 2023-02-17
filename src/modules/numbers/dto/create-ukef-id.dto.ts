import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Max, MaxLength } from 'class-validator';

export class CreateUkefIdDto {
  @IsInt()
  @IsNotEmpty()
  @Max(9)
  @ApiProperty({ example: 1 })
  readonly numberTypeId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiProperty({ example: 'ECGD\\jsmith', description: 'User if it is known' })
  readonly createdBy: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  @ApiProperty({ example: 'NodeJs/App' })
  readonly requestingSystem: string;
}
