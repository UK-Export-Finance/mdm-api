import { IsEnum, IsOptional } from 'class-validator';

import { QueryParamActiveEnum } from './query-param-active-enum';

export class MarketsQueryDto {
  @IsEnum(QueryParamActiveEnum)
  @IsOptional()
  public active: string;
}
