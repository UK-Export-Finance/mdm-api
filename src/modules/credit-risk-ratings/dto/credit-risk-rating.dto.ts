import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreditRiskRatingDto {
  @ApiProperty({
    example: 'A++',
    description: 'Credit risk rating ID',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    example: 'A++',
    description: 'Credit risk rating description',
  })
  @IsString()
  readonly description: string;

  @ApiProperty({
    example: '2017-03-06T16:43:47.000Z',
    description: 'Credit risk rating created at',
  })
  @IsDateString()
  readonly createdAt: string;

  @ApiProperty({
    example: '2017-03-06T16:43:47.000Z',
    description: 'Credit risk rating updated at',
  })
  @IsDateString()
  readonly updatedAt: string;

  @ApiProperty({
    example: '2017-03-06T10:44:47.000Z',
    description: 'Credit risk rating effective from',
  })
  @IsDateString()
  readonly effectiveFrom: string;

  @ApiProperty({
    example: '9999-03-0 216T16:20:17.000Z',
    description: 'Credit risk rating effective to',
  })
  @IsDateString()
  readonly effectiveTo: string;
}
