import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';

import { CreditRiskRatingsController } from './credit-risk-ratings.controller';
import { CreditRiskRatingsService } from './credit-risk-ratings.service';
import { CreditRiskRatingEntity } from './entities/credit-risk-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditRiskRatingEntity], DATABASE_NAME.MDM)],
  controllers: [CreditRiskRatingsController],
  providers: [CreditRiskRatingsService],
})
export class CreditRiskRatingsModule {}
