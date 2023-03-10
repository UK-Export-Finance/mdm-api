import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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
      const spResults = await this.mdmDataSource.query('USP_MDM_READ_EXPOSURE_PERIOD @0, @1, @2', [startDate, endDate, productGroup]);

      if (!spResults || !spResults[0] || typeof spResults[0].EXPOSURE_PERIOD === 'undefined') {
        throw new InternalServerErrorException('No exposure period result from USP_MDM_READ_EXPOSURE_PERIOD');
      }

      return { exposurePeriod: spResults[0].EXPOSURE_PERIOD };
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
