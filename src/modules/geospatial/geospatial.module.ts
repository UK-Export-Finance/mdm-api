import { Module } from '@nestjs/common';
import { OrdnanceSurveyModule } from '@ukef/helper-modules/ordnance-survey/ordnance-survey.module';

import { GeospatialController } from './geospatial.controller';
import { GeospatialService } from './geospatial.service';

@Module({
  imports: [OrdnanceSurveyModule],
  controllers: [GeospatialController],
  providers: [GeospatialService],
})
export class GeospatialModule {}
