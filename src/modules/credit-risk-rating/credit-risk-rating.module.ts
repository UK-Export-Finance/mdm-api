import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditRiskRatingController } from './credit-risk-rating.controller';
import { CreditRiskRatingService } from './credit-risk-rating.service';
import { CreditRiskRatingEntity } from './entities/credit-risk-rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditRiskRatingEntity])],
  controllers: [CreditRiskRatingController],
  providers: [CreditRiskRatingService],
})
export class CreditRiskRatingModule {}
