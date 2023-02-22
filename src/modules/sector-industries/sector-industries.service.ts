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
      let whereConditions: object;

      whereConditions = { effectiveTo: Equal(new Date('9999-12-31 00:00:00.000')) };
      if (ukefSectorIdInput) {
        whereConditions = { ...whereConditions, ukefSectorId: ukefSectorIdInput };
      }
      if (ukefIndustryId) {
        whereConditions = { ...whereConditions, ukefIndustryId: ukefIndustryId };
      }

      const results = await this.sectorIndustries.find({ where: whereConditions });

      if (results && !results[0]) {
        throw new NotFoundException('No results for your search criteria');
      }

      return results;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      } else {
        this.logger.error(err);
        throw new InternalServerErrorException();
      }
    }
  }
}
