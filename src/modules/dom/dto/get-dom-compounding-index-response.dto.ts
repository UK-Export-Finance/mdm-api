import { ApiProperty } from '@nestjs/swagger';

/**
 * The response DTO for the GET /dom/compounding-index endpoint.
 * This is mapped from the response received from the ODS query for DOM compounding indices in {@link GetDomCompoundingIndexOdsResponseDto}.
 */
export class GetDomCompoundingIndexResponseDto {
  @ApiProperty({ description: 'The code of the interest rate ticker', example: 'EUR001' })
  readonly code: string;

  @ApiProperty({ description: 'The start date and time the interest rate is active from', example: '2026-02-09T00:00:00' })
  readonly startDate: string;

  @ApiProperty({ description: 'The end date and time the interest rate is active until', example: '2026-02-09T23:59:59' })
  readonly endDate: string;

  @ApiProperty({ description: 'The number of days for which the interest rate is active', example: 1 })
  readonly daysActive: number;

  @ApiProperty({ description: 'The interest rate', example: 1.93 })
  readonly rate: number;

  @ApiProperty({ description: 'The compounding index value for the interest rate', example: 10000.5361111111 })
  readonly compoundingIndexValue: number;
}
