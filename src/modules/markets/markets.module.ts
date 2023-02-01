import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketEntity } from './entities/market.entity';
import { MarketsController } from './markets.controller';
import { MarketsService } from './markets.service';

@Module({
  imports: [TypeOrmModule.forFeature([MarketEntity], 'mssql-cis')],
  controllers: [MarketsController],
  providers: [MarketsService],
})
export class MarketsModule {}
