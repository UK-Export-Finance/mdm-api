import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { CreditRiskRatingEntity } from '../entities/credit-risk-rating.entity';

@Injectable()
export class CreditRiskRatingsService {
  constructor(
    @InjectRepository(CreditRiskRatingEntity, DATABASE_NAME.MDM)
    private readonly creditRiskRating: Repository<CreditRiskRatingEntity>,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Get all credit risk ratings
   *
   * @returns {Promise<CreditRiskRatingEntity[]>}
   */
  async getAll(): Promise<CreditRiskRatingEntity[]> {
    try {
      this.logger.info('Getting credit risk ratings');

      const result = await this.creditRiskRating.find({ order: { id: 'ASC' } });

      return result;
    } catch (error) {
      this.logger.error('Error getting credit risk ratings %o', error);

      throw new Error(`Error getting credit risk ratings`, error);
    }
  }
}
