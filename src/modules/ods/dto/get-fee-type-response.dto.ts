import { ApiProperty } from '@nestjs/swagger';

export class GetFeeTypeResponseDto {
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
  readonly classification: string;

  @ApiProperty({
    description: 'Fee type expense/income',
    example: 'Expense',
  })
  readonly expenseIncome: string;

  @ApiProperty({
    description: 'Fee type active flag',
    example: true,
  })
  readonly isActive: boolean;
}
