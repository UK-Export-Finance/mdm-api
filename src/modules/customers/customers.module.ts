import { Module } from '@nestjs/common';
import { DunAndBradstreetModule } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.module';
import { InformaticaModule } from '@ukef/modules/informatica/informatica.module';
import { SalesforceModule } from '@ukef/modules/salesforce/salesforce.module';

import { NumbersModule } from '../numbers/numbers.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [InformaticaModule, SalesforceModule, NumbersModule, DunAndBradstreetModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
