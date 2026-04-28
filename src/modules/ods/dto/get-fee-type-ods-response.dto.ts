import { ApiProperty } from '@nestjs/swagger';

export class GetFeeTypeOdsResponseDto {
  @ApiProperty({
    description: 'Fee type code',
    example: 'BEX',
  })
  readonly feeType: string;

  @ApiProperty({
    description: 'Fee type name',
    example: 'Brokerage Expense',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Fee type classification',
    example: 'Fixed',
  })
  readonly feeTypeClassification: string;

  @ApiProperty({
    description: 'Fee type expense/income',
    example: 'Expense',
  })
  readonly feeTypeExpenseIncome: string;

  @ApiProperty({
    description: 'Fee type active flag',
    example: true,
  })
  readonly feeTypeActive: boolean;
}
