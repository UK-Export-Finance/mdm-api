import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InterestRatesEntity } from './entities/interest-rate.entity';
import { InterestRatesController } from './interest-rates.controller';
import { InterestRatesService } from './interest-rates.service';

@Module({
  imports: [TypeOrmModule.forFeature([InterestRatesEntity], 'mssql-cis')],
  controllers: [InterestRatesController],
  providers: [InterestRatesService],
})
export class InterestRatesModule {}
