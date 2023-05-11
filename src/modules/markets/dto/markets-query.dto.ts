import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { QueryParamActiveEnum } from './query-param-active-enum';

export class MarketsQueryDto {
  @IsEnum(QueryParamActiveEnum)
  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'Y',
    description: 'Optional filtering by field "active". If parameter is not provided result will include active and not active markets',
    enum: QueryParamActiveEnum,
  })
  public active: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'korea',
    description: 'Optional filtering by fields "marketName" or "isoCode". Partial matches are allowed and search is not case sensitive',
  })
  public search: string;
}
