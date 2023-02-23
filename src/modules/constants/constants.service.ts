import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DbResponseHelper } from '../../helpers/db-response.helper';
import { ConstantSpiEntity } from './entities/constants-spi.entity';

@Injectable()
export class ConstantsService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(ConstantSpiEntity, 'mssql-cis')
    private readonly constantsCisRepository: Repository<ConstantSpiEntity>,
  ) {}

  async find(oecdRiskCategory: number, category: string): Promise<ConstantSpiEntity[]> {
    try {
      const spResults = await this.constantsCisRepository.query('USP_MDM_READ_SPI_CONSTANTS @0, @1', [category, oecdRiskCategory]);

      if (spResults && !spResults[0]) {
        throw new NotFoundException('No results for your search criteria');
      }

      const fieldMap = DbResponseHelper.getApiNameToDbNameMap(this.constantsCisRepository);

      const renamedResults = DbResponseHelper.renameDbResultFields(this.constantsCisRepository, fieldMap, spResults);

      // Transform results to match logic in old implementation.
      const transformedResults = renamedResults.map((result) => {
        if (result.category === result.subCategory) result.subCategory = '';
        return result;
      });

      return transformedResults;
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.warn(err);
        throw err;
      }
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
