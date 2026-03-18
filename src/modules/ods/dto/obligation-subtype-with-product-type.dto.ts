import { ApiProperty } from '@nestjs/swagger';

import { GetObligationSubtypeResponseDto } from './get-obligation-subtype-response.dto';

export class ObligationSubtypeWithProductTypeDto extends GetObligationSubtypeResponseDto {
  @ApiProperty({
    description: 'TODO',
    example: 'TODO',
  })
  readonly productTypeCode: string;
}
