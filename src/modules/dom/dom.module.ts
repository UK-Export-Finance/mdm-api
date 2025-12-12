import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';

import { OdsService } from '../ods/ods.service';
import { CreditRiskRatingsService } from './credit-risk-ratings/credit-risk-ratings.service';
import { DomController } from './dom.controller';
import { DomService } from './dom.service';
import { CreditRiskRatingEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CreditRiskRatingEntity], DATABASE_NAME.MDM)],
  controllers: [DomController],
  providers: [DomService, OdsService, CreditRiskRatingsService],
})
export class DomModule {}
