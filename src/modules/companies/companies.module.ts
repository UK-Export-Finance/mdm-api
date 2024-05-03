import { Module } from '@nestjs/common';
import { CompaniesHouseModule } from '@ukef/helper-modules/companies-house/companies-house.module';

import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

@Module({
  imports: [CompaniesHouseModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
