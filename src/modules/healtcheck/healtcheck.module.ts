import { Module } from '@nestjs/common';
import { HealtcheckController } from './healtcheck.controller';
import { HealtcheckService } from './healtcheck.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UkefNumber as Number } from '../numbers/entities/number.entity';
import { MarketEntity } from '../markets/entities/market.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Number], 'mssql-number-generator'), TypeOrmModule.forFeature([MarketEntity], 'mssql-cis')],
  controllers: [HealtcheckController],
  providers: [HealtcheckService],
})
export class HealtcheckModule {}
