import { Module } from '@nestjs/common';

import { GovukNotifyService } from './govuk-notify.service';

@Module({
  imports: [],
  providers: [GovukNotifyService],
  exports: [GovukNotifyService],
})
export class GovukNotifyModule {}
