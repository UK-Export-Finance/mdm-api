import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';

import { SectorIndustryEntity } from './entities/sector-industry.entity';
import { SectorIndustriesController } from './sector-industries.controller';
import { SectorIndustriesService } from './sector-industries.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectorIndustryEntity], DATABASE.MDM)],
  controllers: [SectorIndustriesController],
  providers: [SectorIndustriesService],
})
export class SectorIndustriesModule {}
