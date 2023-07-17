import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE, REDACT_STRINGS, REDACT_STRING_PATHS } from '@ukef/constants';
import { DataSource } from 'typeorm';

import { ExposurePeriodDto } from './dto/exposure-period.dto';
import { PinoLogger } from 'nestjs-pino';
import { redactError } from '@ukef/helpers/redact-errors.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExposurePeriodService {

  constructor(
    @InjectDataSource(DATABASE.MDM)
    private readonly mdmDataSource: DataSource,
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
  ) {}

  async calculate(startDate: string, endDate: string, productGroup: string): Promise<ExposurePeriodDto> {
    try {
      // TODO: SP USP_MDM_READ_EXPOSURE_PERIOD is not using data/tables from DB. Calculation could be moved to Javascript.
      const results = await this.mdmDataSource.query('USP_MDM_READ_EXPOSURE_PERIOD @0, @1, @2', [startDate, endDate, productGroup]);

      if (!results.length || typeof results[0].EXPOSURE_PERIOD === 'undefined') {
        throw new InternalServerErrorException('No exposure period result from USP_MDM_READ_EXPOSURE_PERIOD');
      }

      return { exposurePeriod: results[0].EXPOSURE_PERIOD };
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.warn(redactError(this.config.get<boolean>('app.redactLogs'), REDACT_STRING_PATHS, REDACT_STRINGS, err));
        throw err;
      } else {
        this.logger.error(redactError(this.config.get<boolean>('app.redactLogs'), REDACT_STRING_PATHS, REDACT_STRINGS, err));
        throw new InternalServerErrorException();
      }
    }
  }
}
