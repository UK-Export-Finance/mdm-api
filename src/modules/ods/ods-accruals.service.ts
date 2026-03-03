import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapAccrualScheduleClassification, mapAccrualScheduleClassifications } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { GetAccrualScheduleClassificationOdsResponseDto, GetAccrualScheduleClassificationResponseDto, ODS_ENTITIES, OdsStoredProcedureOutputBody } from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsAccrualsService {
  constructor(
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find an accrual schedule classification by classification code
   * @param {string} scheduleCode: Schedule code
   * @returns {Promise<GetAccrualScheduleClassificationResponseDto>}
   * @throws {NotFoundException} If no accrual schedule classification is found
   */
  async findScheduleClassification(classificationCode: string): Promise<GetAccrualScheduleClassificationResponseDto> {
    try {
      this.logger.info('Finding accrual schedule classification %s', classificationCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.ACCRUAL_SCHEDULE_CLASSIFICATION,
        queryPageSize: 1,
        queryParameters: {
          classification_code: classificationCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding accrual schedule classification %s from ODS stored procedure, output %o', classificationCode, storedProcedureResult);

        throw new Error(`Error finding accrual schedule classification ${classificationCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No accrual schedule classification ${classificationCode} found`);
      }

      const classification = storedProcedureJson.results[0] as GetAccrualScheduleClassificationOdsResponseDto;

      return mapAccrualScheduleClassification(classification);
    } catch (error) {
      this.logger.error('Error finding accrual schedule classification %s %o', classificationCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new Error(`Error finding accrual schedule classification ${classificationCode}`, { cause: error });
    }
  }

  /**
   * Get all accrual schedule classifications from ODS
   * @returns {Promise<GetAccrualScheduleClassificationResponseDto[]>} Accrual schedule classifications
   * @throws {InternalServerErrorException} If there is an error getting accrual schedule classifications from ODS
   */
  async getScheduleClassifications(): Promise<GetAccrualScheduleClassificationResponseDto[]> {
    try {
      this.logger.info('Getting Accrual schedule classifications from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.ACCRUAL_SCHEDULE_CLASSIFICATION,
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting Accrual schedule classifications from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting Accrual schedule classifications from ODS stored procedure');
      }

      const accrualSchedules = storedProcedureJson.results as GetAccrualScheduleClassificationOdsResponseDto[];

      const mappedSchedules = mapAccrualScheduleClassifications(accrualSchedules);

      return mappedSchedules;
    } catch (error) {
      this.logger.error('Error getting Accrual schedule classifications from ODS %o', error);

      throw new InternalServerErrorException('Error getting Accrual schedule classifications from ODS');
    }
  }
}
