import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';
import { CurrencyEntity } from './entities/currency.entity';
import { CurrencyExchangeEntity } from './entities/currency-exchange.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyEntity], 'mssql-mdm'), TypeOrmModule.forFeature([CurrencyExchangeEntity], 'mssql-cedar')],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}
