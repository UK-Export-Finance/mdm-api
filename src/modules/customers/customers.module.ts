import { Module } from '@nestjs/common';
import { DunAndBradstreetModule } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.module';
import { SalesforceModule } from '@ukef/modules/salesforce/salesforce.module';

import { NumbersModule } from '@ukef/modules/numbers/numbers.module';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [SalesforceModule, NumbersModule, DunAndBradstreetModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
