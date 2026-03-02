import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE_NAME, STORED_PROCEDURE } from '@ukef/constants';
import { mapAccrualSchedule, mapAccrualSchedules } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { GetAccrualScheduleOdsResponseDto, GetAccrualScheduleResponseDto, ODS_ENTITIES, OdsStoredProcedureOutputBody } from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsAccrualsService {
  constructor(
    @InjectDataSource(DATABASE_NAME.ODS)
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find an accrual schedule by industry code
   * @param {string} scheduleCode: Accrual code
   * @returns {Promise<GetAccrualScheduleResponseDto>}
   * @throws {NotFoundException} If no accrual schedule is found
   */
  async findSchedule(scheduleCode: string): Promise<GetAccrualScheduleResponseDto> {
    try {
      this.logger.info('Finding accrual schedule %s', scheduleCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.ACCRUAL_SCHEDULE,
        queryPageSize: 1,
        queryParameters: {
          classification_type_code: scheduleCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding accrual schedule %s from ODS stored procedure, output %o', scheduleCode, storedProcedureResult);

        throw new Error(`Error finding accrual schedule ${scheduleCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No accrual schedule ${scheduleCode} found`);
      }

      const schedule = storedProcedureJson.results[0] as GetAccrualScheduleOdsResponseDto;

      return mapAccrualSchedule(schedule);
    } catch (error) {
      this.logger.error('Error finding accrual schedule %s %o', scheduleCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new Error(`Error finding accrual schedule ${scheduleCode}`, { cause: error });
    }
  }

  /**
   * Get all accrual schedules from ODS
   * @returns {Promise<GetAccrualScheduleResponseDto[]>} Accrual schedules
   * @throws {InternalServerErrorException} If there is an error getting accrual schedules from ODS
   */
  async getSchedules(): Promise<GetAccrualScheduleResponseDto[]> {
    try {
      this.logger.info('Getting Accrual schedules from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.ACCRUAL_SCHEDULE,
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting Accrual schedules from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting Accrual schedules from ODS stored procedure');
      }

      const accrualSchedules = storedProcedureJson.results as GetAccrualScheduleOdsResponseDto[];

      const mappedSchedules = mapAccrualSchedules(accrualSchedules);

      return mappedSchedules;
    } catch (error) {
      this.logger.error('Error getting Accrual schedules from ODS %o', error);

      throw new InternalServerErrorException('Error getting Accrual schedules from ODS');
    }
  }
}
