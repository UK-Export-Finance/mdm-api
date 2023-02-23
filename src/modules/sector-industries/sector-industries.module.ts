import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectorIndustryEntity } from './entities/sector-industry.entity';
import { SectorIndustriesController } from './sector-industries.controller';
import { SectorIndustriesService } from './sector-industries.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectorIndustryEntity], 'mssql-mdm')],
  controllers: [SectorIndustriesController],
  providers: [SectorIndustriesService],
})
export class SectorIndustriesModule {}
