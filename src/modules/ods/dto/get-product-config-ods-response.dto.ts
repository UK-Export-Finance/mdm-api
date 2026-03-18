import { ApiProperty } from '@nestjs/swagger';

class ConfigurationLeadDaysOdsResponse {
  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly repayments: number;

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly interestAccruals: number;

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly accruingFees: number;
}

class ConfigurationOdsResponse {
  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly creditType: string;

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly leadDays: ConfigurationLeadDaysOdsResponse;
}

export class GetProductConfigOdsResponse {
  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly productType: string;

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly name: string;

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly shortName: string;

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly productActive: boolean;

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly configuration: ConfigurationOdsResponse;

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly counterpartyRoleTypes: string[];

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly facilityCategoryTypes: string[];

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly obligationSubtypes: string[];

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly account: string[];

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly additionalRateTypes: string[];

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly baseRateTypes: string[];

  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly accrualScheduleTypes: string[];
}
