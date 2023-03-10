import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';
import { Response } from 'express';
import { Equal, Repository } from 'typeorm';

import { DbResponseHelper } from '../../helpers/db-response.helper';
import { CreatePremiumScheduleDto } from './dto/create-premium-schedule.dto';
import { PremiumScheduleEntity } from './entities/premium-schedule.entity';

@Injectable()
export class PremiumSchedulesService {
  private readonly logger = new Logger();
  constructor(
    @InjectRepository(PremiumScheduleEntity, DATABASE.MDM)
    private readonly premiumSchedulesRepository: Repository<PremiumScheduleEntity>,
  ) {}

  async find(facilityId: string): Promise<PremiumScheduleEntity[]> {
    try {
      const results = await this.premiumSchedulesRepository.find({
        where: { facilityURN: Equal(facilityId), isActive: Equal('Y') },
        order: { period: 'ASC' },
      });
      if (!results.length) {
        throw new NotFoundException('Premium Schedules are not found');
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

  /**
   * Generate premium schedules in table INCOME_EXPOSURE.
   *
   * SP input variables:
   * @Portal_FACILITY_ID NVARCHAR (10)
   * ,@PRODUCT_GROUP NVARCHAR (2).
   * ,@PREMIUM_TYPE_ID INT
   * ,@PREMIUM_FREQUENCY_ID INT
   * ,@GUARANTEE_EXPIRY_DATE DATE
   * ,@GUARANTEE_COMMENCEMENT_DATE DATE
   * ,@GUARANTEE_PERCENTAGE DECIMAL (20,6)
   * ,@GUARANTEE_FEE_PERCENTAGE DECIMAL (20,6)
   * ,@DAY_BASIS DECIMAL (18,6)
   * ,@EXPOSURE_PERIOD DECIMAL (18,2)
   * ,@CUMULATIVE_AMOUNT DECIMAL (20,2)
   * ,@MAXIMUM_LIABILITY
   */
  async create(res: Response, createPremiumSchedule: CreatePremiumScheduleDto): Promise<CreatePremiumScheduleDto[]> {
    try {
      const spResults = await this.premiumSchedulesRepository.query('USP_MDM_INCOME_EXPOSURE @0, @1, @2, @3, @4, @5, @6, @7, @8, @9, @10, @11', [
        createPremiumSchedule.facilityURN,
        createPremiumSchedule.productGroup,
        createPremiumSchedule.premiumTypeId,
        createPremiumSchedule.premiumFrequencyId,
        createPremiumSchedule.guaranteeExpiryDate,
        createPremiumSchedule.guaranteeCommencementDate,
        createPremiumSchedule.guaranteePercentage,
        createPremiumSchedule.guaranteeFeePercentage,
        createPremiumSchedule.dayBasis,
        createPremiumSchedule.exposurePeriod,
        createPremiumSchedule.cumulativeAmount,
        createPremiumSchedule.maximumLiability,
      ]);

      // Set Location header.
      res.set({ Location: '/premium/segments/' + createPremiumSchedule.facilityURN });

      // Older Mulesoft implementation return Location header and empty payload, but here we already have new segments and can return them.
      const fieldMap = DbResponseHelper.getApiNameToDbNameMap(this.premiumSchedulesRepository);

      const renamedResults = DbResponseHelper.renameDbResultFields(this.premiumSchedulesRepository, fieldMap, spResults);

      // Transform results to match logic in old implementation.
      const transformedResults = renamedResults.map((result) => {
        // Remove time part of Date field calculationDate.
        result.calculationDate = result.calculationDate.toISOString().split('T')[0];
        return result;
      });

      return transformedResults;
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }
}
