import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants/examples/examples.constant';

export class GetFeeTypeOdsResponseDto {
  @ApiProperty({
    description: 'Fee type code',
    example: EXAMPLES.ODS.FEE_TYPE.feeType,
  })
  readonly feeType: string;

  @ApiProperty({
    description: 'Fee type name',
    example: EXAMPLES.ODS.FEE_TYPE.name,
  })
  readonly name: string;

  @ApiProperty({
    description: 'Fee type classification',
    example: EXAMPLES.ODS.FEE_TYPE.classification,
  })
  readonly feeTypeClassification: string;

  @ApiProperty({
    description: 'Fee type expense/income',
    example: EXAMPLES.ODS.FEE_TYPE.expenseIncome,
  })
  readonly feeTypeExpenseIncome: string;

  @ApiProperty({
    description: 'Fee type active flag',
    example: EXAMPLES.ODS.FEE_TYPE.isActive,
  })
  readonly feeTypeActive: boolean;
}
