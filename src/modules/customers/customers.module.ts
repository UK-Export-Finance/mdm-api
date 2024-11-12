import { Module } from '@nestjs/common';
import { SalesforceModule } from  '@ukef/modules/salesforce/salesforce.module';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  imports: [SalesforceModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
