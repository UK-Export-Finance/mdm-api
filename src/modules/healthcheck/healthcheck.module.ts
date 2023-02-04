import { Module } from '@nestjs/common';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UkefId } from '../numbers/entities/ukef-id.entity';
import { MarketEntity } from '../markets/entities/market.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UkefId], 'mssql-number-generator'), TypeOrmModule.forFeature([MarketEntity], 'mssql-cis')],
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
})
export class HealthcheckModule {}
