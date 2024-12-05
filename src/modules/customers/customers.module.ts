import { Module } from '@nestjs/common';
import { InformaticaModule } from '@ukef/modules/informatica/informatica.module';
import { SalesforceModule } from '@ukef/modules/salesforce/salesforce.module';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { NumbersModule } from '../numbers/numbers.module';
import { DunAndBradstreetModule } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.module';

@Module({
  imports: [InformaticaModule, SalesforceModule, NumbersModule, DunAndBradstreetModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
