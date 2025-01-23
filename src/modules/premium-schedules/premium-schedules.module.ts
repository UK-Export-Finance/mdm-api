import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';

import { PremiumScheduleEntity } from './entities/premium-schedule.entity';
import { PremiumSchedulesController } from './premium-schedules.controller';
import { PremiumSchedulesService } from './premium-schedules.service';

@Module({
  imports: [TypeOrmModule.forFeature([PremiumScheduleEntity], DATABASE_NAME.MDM)],
  controllers: [PremiumSchedulesController],
  providers: [PremiumSchedulesService],
})
export class PremiumSchedulesModule {}
