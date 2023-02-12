import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MarketEntity } from '../markets/entities/market.entity';
import { UkefId } from '../numbers/entities/ukef-id.entity';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

@Module({
  imports: [TypeOrmModule.forFeature([UkefId], 'mssql-number-generator'), TypeOrmModule.forFeature([MarketEntity], 'mssql-cis')],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class HealthcheckModule {}
