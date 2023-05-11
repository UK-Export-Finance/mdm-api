import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';
import { DataSource } from 'typeorm';

import { ExposurePeriodDto } from './dto/exposure-period.dto';

@Injectable()
export class ExposurePeriodService {
  private readonly logger = new Logger();

  constructor(
    @InjectDataSource(DATABASE.MDM)
    private readonly mdmDataSource: DataSource,
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
        this.logger.warn(err);
        throw err;
      } else {
        this.logger.error(err);
        throw new InternalServerErrorException();
      }
    }
  }
}
