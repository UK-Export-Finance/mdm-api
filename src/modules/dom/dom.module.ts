import { Module } from '@nestjs/common';

import { OdsService } from '../ods/ods.service';
import { DomController } from './dom.controller';
import { DomService } from './dom.service';

@Module({
  controllers: [DomController],
  providers: [DomService, OdsService],
})
export class DomModule {}
