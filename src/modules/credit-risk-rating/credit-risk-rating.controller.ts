import { Controller, Get, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreditRiskRatingService } from './credit-risk-rating.service';
import { CreditRiskRatingEntity } from './entities/credit-risk-rating.entity';

@Controller('credit-risk-rating')
@ApiBearerAuth()
@ApiTags('credit-risk-rating')
export class CreditRiskRatingController {
  constructor(private readonly creditRiskRating: CreditRiskRatingService) {}

  @Get()
  @Version('1')
  @ApiResponse({
    status: 200,
    description: 'Get all active countries',
    type: CreditRiskRatingEntity,
  })
  findAll(): Promise<CreditRiskRatingEntity[]> {
    return this.creditRiskRating.findAll();
  }
}
