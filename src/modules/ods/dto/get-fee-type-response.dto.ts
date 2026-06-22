import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class GetFeeTypeResponseDto {
  @ApiProperty({
    description: 'Fee type code',
    example: EXAMPLES.FEE_TYPE.FEE_TYPE,
  })
  readonly feeType: string;

  @ApiProperty({
    description: 'Fee type name',
    example: EXAMPLES.FEE_TYPE.NAME,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Fee type classification',
    example: EXAMPLES.FEE_TYPE.CLASSIFICATION,
  })
  readonly classification: string;

  @ApiProperty({
    description: 'Fee type expense/income',
    example: EXAMPLES.FEE_TYPE.EXPENSE_INCOME,
  })
  readonly expenseIncome: string;

  @ApiProperty({
    description: 'Fee type active flag',
    example: EXAMPLES.FEE_TYPE.IS_ACTIVE,
  })
  readonly isActive: boolean;

  @ApiProperty({
    description: 'Balance category',
    example: EXAMPLES.FEE_TYPE.BALANCE_CATEGORY,
    nullable: true,
  })
  readonly balanceCategory: string | null;

  @ApiProperty({
    description: 'Base balance category',
    example: EXAMPLES.FEE_TYPE.BASE_BALANCE_CATEGORY,
    nullable: true,
  })
  readonly baseBalanceCategory: string | null;

  @ApiProperty({
    description: 'Non-facility currency settlement flag',
    example: EXAMPLES.FEE_TYPE.NON_FACILITY_CURRENCY_SETTLEMENT,
  })
  readonly nonFacilityCurrencySettlement: boolean;

  @ApiProperty({
    description: 'If the base balance upon which the fee accrues should be capped',
    example: EXAMPLES.FEE_TYPE.CAPPED_BASE_BALANCE,
  })
  readonly cappedBaseBalance: boolean;
}
