import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE_NAME, DATE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { Equal, Repository } from 'typeorm';

import { SectorIndustryEntity } from './entities/sector-industry.entity';

@Injectable()
export class SectorIndustriesService {
  constructor(
    @InjectRepository(SectorIndustryEntity, DATABASE_NAME.MDM)
    private readonly sectorIndustries: Repository<SectorIndustryEntity>,
    private readonly logger: PinoLogger,
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
        this.logger.warn(err);
        throw err;
      } else {
        this.logger.error(err);
        throw new InternalServerErrorException();
      }
    }
  }
}
