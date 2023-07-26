import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';
import { DbResponseHelper } from '@ukef/helpers/db-response.helper';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { ConstantSpiEntity } from './entities/constants-spi.entity';

@Injectable()
export class ConstantsService {
  constructor(
    @InjectRepository(ConstantSpiEntity, DATABASE.CIS)
    private readonly constantsCisRepository: Repository<ConstantSpiEntity>,
    private readonly logger: PinoLogger,
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
