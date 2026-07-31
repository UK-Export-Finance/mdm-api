import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants/examples/examples.constant';

export class GetFeeTypeOdsResponseDto {
  @ApiProperty({
    description: 'Fee type code',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.feeType,
  })
  readonly feeType: string;

  @ApiProperty({
    description: 'Fee type name',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Fee type classification',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeClassification,
  })
  readonly feeTypeClassification: string;

  @ApiProperty({
    description: 'Fee type expense/income',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeExpenseIncome,
  })
  readonly feeTypeExpenseIncome: string;

  @ApiProperty({
    description: 'Fee type active flag',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeActive,
  })
  readonly feeTypeActive: boolean;

  @ApiProperty({
    description: 'Balance category',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.balanceCategory,
    nullable: true,
  })
  readonly balanceCategory: string | null;

  @ApiProperty({
    description: 'Base balance category',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.baseBalanceCategory,
    nullable: true,
  })
  readonly baseBalanceCategory?: string;

  @ApiProperty({
    description: 'Non-facility currency settlement flag',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.nonFacilityCurrencySettlement,
  })
  readonly nonFacilityCurrencySettlement: boolean;

  @ApiProperty({
    description: 'If the base balance upon which the fee accrues should be capped',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.feeTypeCappedBaseBalanceIndicator,
  })
  readonly feeTypeCappedBaseBalanceIndicator: boolean;

  @ApiProperty({
    description: 'What the effective date of the fee should default to if not specified',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.feeEffectiveDateDefault,
    nullable: true,
  })
  readonly feeEffectiveDateDefault: string | null;

  @ApiProperty({
    description: 'What the maturity date of the fee should default to if not specified',
    example: EXAMPLES.ODS.CONFIGURATION_FEE.feeMaturityDateDefault,
    nullable: true,
  })
  readonly feeMaturityDateDefault: string | null;
}
