import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';

import { InterestRatesEntity } from './entities/interest-rate.entity';
import { InterestRatesController } from './interest-rates.controller';
import { InterestRatesService } from './interest-rates.service';

@Module({
  imports: [TypeOrmModule.forFeature([InterestRatesEntity], DATABASE_NAME.CEDAR)],
  controllers: [InterestRatesController],
  providers: [InterestRatesService],
})
export class InterestRatesModule {}
