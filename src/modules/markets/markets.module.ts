import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';

import { MarketEntity } from './entities/market.entity';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';

@Module({
  imports: [TypeOrmModule.forFeature([MarketEntity], DATABASE.CIS)],
  controllers: [MarketsController],
  providers: [MarketsService],
})
export class MarketsModule {}
