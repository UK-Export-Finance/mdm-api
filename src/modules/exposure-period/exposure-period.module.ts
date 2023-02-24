import { Module } from '@nestjs/common';

import { ExposurePeriodController } from './exposure-period.controller';
import { ExposurePeriodService } from './exposure-period.service';

@Module({
  controllers: [ExposurePeriodController],
  providers: [ExposurePeriodService],
})
export class ExposurePeriodModule {}
