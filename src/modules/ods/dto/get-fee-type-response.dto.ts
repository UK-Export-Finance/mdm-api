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
}
