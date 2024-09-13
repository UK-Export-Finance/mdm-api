import { Module } from '@nestjs/common';
import { InformaticaModule } from '@ukef/modules/informatica/informatica.module';
import { SalesforceModule } from  '@ukef/modules/salesforce/salesforce.module';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [InformaticaModule, SalesforceModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
