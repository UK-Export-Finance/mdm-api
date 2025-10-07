import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';

import { YieldRateEntity } from './entities/yield-rate.entity';
import { YieldRatesController } from './yield-rates.controller';
import { YieldRatesService } from './yield-rates.service';

@Module({
  imports: [TypeOrmModule.forFeature([YieldRateEntity], DATABASE.CEDAR)],
  controllers: [YieldRatesController],
  providers: [YieldRatesService],
})
export class YieldRatesModule {}
