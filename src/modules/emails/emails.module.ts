import { Module } from '@nestjs/common';
import { GovukNotifyModule } from '@ukef/helper-modules/govuk-notify/govuk-notify.module';

import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';

@Module({
  imports: [GovukNotifyModule],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
