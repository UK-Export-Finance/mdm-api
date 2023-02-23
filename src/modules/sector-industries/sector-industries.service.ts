import { DATE } from '@mdm/constants';
import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';

import { SectorIndustryEntity } from './entities/sector-industry.entity';

@Injectable()
export class SectorIndustriesService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(SectorIndustryEntity, 'mssql-mdm')
    private readonly sectorIndustries: Repository<SectorIndustryEntity>,
  ) {}

  async find(ukefSectorIdInput, ukefIndustryId): Promise<SectorIndustryEntity[]> {
    try {
      let query: object = { effectiveTo: Equal(new Date(DATE.MAXIMUM_LIMIT)) };

      if (ukefSectorIdInput) {
        query = { ...query, ukefSectorId: ukefSectorIdInput };
      }
      if (ukefIndustryId) {
        query = { ...query, ukefIndustryId: ukefIndustryId };
      }

      const results = await this.sectorIndustries.find({ where: query });

      if (results && !results[0]) {
        throw new NotFoundException('No results for your search criteria');
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
