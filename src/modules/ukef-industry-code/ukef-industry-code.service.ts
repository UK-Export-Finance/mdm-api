import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { Equal, Repository } from 'typeorm';

import { CompaniesHouseIndustryCodeResponseDto } from './dto';
import { UkefIndustryEntity } from './entities';

@Injectable()
export class UkefIndustryCodeService {
  constructor(
    @InjectRepository(UkefIndustryEntity, DATABASE_NAME.MDM)
    private readonly ukefIndustryRepository: Repository<UkefIndustryEntity>,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find a UKEF industry code by Companies House industry code.
   * @param {number} industryCode Companies House industry code
   * @returns {Promise<string>} UKEF industry code
   * @throws {NotFoundException} If no UKEF industry code is found for the given Companies House industry code
   * @throws {InternalServerErrorException} If there is an error querying the database
   */
  async find(industryCode: number): Promise<CompaniesHouseIndustryCodeResponseDto> {
    try {
      this.logger.info('Finding a UKEF industry code for Companies House industry code %s', industryCode);

      const results = await this.ukefIndustryRepository.find({
        where: { industryId: Equal(industryCode) },
      });

      if (!results?.length) {
        this.logger.error('No UKEF industry code found for Companies House industry code %s', industryCode);

        throw new NotFoundException(`No UKEF industry code found for Companies House industry code ${industryCode}`);
      }

      const ukefIndustryCode = results[0]?.code;

      if (!ukefIndustryCode) {
        this.logger.error('No UKEF industry code found for Companies House industry code %s', industryCode);

        throw new NotFoundException(`No UKEF industry code found for Companies House industry code ${industryCode}`);
      }

      return { ukefIndustryCode };
    } catch (error) {
      this.logger.error('Error finding a UKEF industry code for Companies House industry code %s %o', industryCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(`Error finding a UKEF industry code for Companies House industry code ${industryCode}`);
    }
  }
}
