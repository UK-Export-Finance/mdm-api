import { MarketEntity } from '@mdm/module/markets/entities/market.entity';
import { UkefId } from '@mdm/module/numbers/entities/ukef-id.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

@Module({
  imports: [TypeOrmModule.forFeature([UkefId], 'mssql-number-generator'), TypeOrmModule.forFeature([MarketEntity], 'mssql-cis')],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class HealthcheckModule {}
