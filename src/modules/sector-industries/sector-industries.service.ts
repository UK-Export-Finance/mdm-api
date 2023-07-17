import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE, DATE, REDACT_STRINGS, REDACT_STRING_PATHS } from '@ukef/constants';
import { Equal, Repository } from 'typeorm';

import { SectorIndustryEntity } from './entities/sector-industry.entity';
import { PinoLogger } from 'nestjs-pino';
import { redactError } from '@ukef/helpers/redact-errors.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SectorIndustriesService {
  constructor(
    @InjectRepository(SectorIndustryEntity, DATABASE.MDM)
    private readonly sectorIndustries: Repository<SectorIndustryEntity>,
    private readonly logger: PinoLogger,
    private readonly config: ConfigService,
  ) {}

  async find(ukefSectorId: string, ukefIndustryId: string): Promise<SectorIndustryEntity[]> {
    try {
      let query: object = { effectiveTo: Equal(new Date(DATE.MAXIMUM_LIMIT)) };

      if (ukefSectorId) {
        query = { ...query, ukefSectorId };
      }
      if (ukefIndustryId) {
        query = { ...query, ukefIndustryId };
      }

      const results = await this.sectorIndustries.find({ where: query });

      if (!results.length) {
        throw new NotFoundException('No results found for your search criteria');
      }

      return results;
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
