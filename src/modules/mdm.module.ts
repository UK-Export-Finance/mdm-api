import { Module } from '@nestjs/common';

import { NumbersModule } from './numbers/numbers.module';
import { MarketsModule } from './markets/markets.module';
import { HealtcheckModule } from './healtcheck/healtcheck.module';

@Module({
  imports: [NumbersModule, HealtcheckModule, MarketsModule],
  exports: [NumbersModule, HealtcheckModule, MarketsModule],
})
export class MdmModule {}
