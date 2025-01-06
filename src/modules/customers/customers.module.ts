import { Module } from '@nestjs/common';
import { InformaticaModule } from '@ukef/modules/informatica/informatica.module';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { DunAndBradstreetModule } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.module';

@Module({
  imports: [InformaticaModule, DunAndBradstreetModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
