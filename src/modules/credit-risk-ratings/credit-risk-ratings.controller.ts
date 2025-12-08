import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreditRiskRatingsService } from './credit-risk-ratings.service';
import { CreditRiskRatingDto } from './dto';
import { CreditRiskRatingEntity } from './entities/credit-risk-rating.entity';

@ApiTags('credit-risk-ratings')
@Controller('credit-risk-ratings')
export class CreditRiskRatingsController {
  constructor(private readonly creditRiskRatingsService: CreditRiskRatingsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all credit risk ratings',
  })
  @ApiResponse({
    status: 200,
    description: 'All credit risk ratings',
    type: [CreditRiskRatingDto],
  })
  findAll(): Promise<CreditRiskRatingEntity[]> {
    return this.creditRiskRatingsService.findAll();
  }
}
