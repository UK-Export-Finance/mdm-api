import { Module } from '@nestjs/common';

import { DomController } from './dom.controller';
import { DomService } from './dom.service';

@Module({
  controllers: [DomController],
  providers: [DomService],
})
export class DomModule {}
