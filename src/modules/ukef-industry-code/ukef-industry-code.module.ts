import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';

import { UkefIndustryEntity } from './entities';
import { UkefIndustryCodeController } from './ukef-industry-code.controller';
import { UkefIndustryCodeService } from './ukef-industry-code.service';

@Module({
  imports: [TypeOrmModule.forFeature([UkefIndustryEntity], DATABASE_NAME.MDM)],
  controllers: [UkefIndustryCodeController],
  providers: [UkefIndustryCodeService],
})
export class UkefIndustryCodeModule {}
