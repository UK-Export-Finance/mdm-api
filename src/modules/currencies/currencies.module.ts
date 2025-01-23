import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';

import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyExchangeEntity } from './entities/currency-exchange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyEntity], DATABASE_NAME.MDM), TypeOrmModule.forFeature([CurrencyExchangeEntity], DATABASE_NAME.CEDAR)],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
