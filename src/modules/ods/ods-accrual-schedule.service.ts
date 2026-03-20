import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapAccrualSchedule, mapAccrualSchedules } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { GetAccrualScheduleOdsResponseDto, GetAccrualScheduleResponseDto, ODS_ENTITIES, OdsStoredProcedureOutputBody } from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsAccrualScheduleService {
  constructor(
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find an accrual schedule by code
   * @param {string} code: Accrual schedule code
   * @returns {Promise<GetAccrualScheduleOdsResponseDto>}
   * @throws {NotFoundException} If no accrual schedule is found
   */
  async findOne(scheduleCode: string): Promise<GetAccrualScheduleResponseDto> {
    try {
      this.logger.info('Finding accrual schedule in ODS %s', scheduleCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.CONFIGURATION_ACCRUAL_SCHEDULE,
        queryPageSize: 1,
        queryParameters: {
          code: scheduleCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding accrual schedule %s from ODS stored procedure, output %o', scheduleCode, storedProcedureResult);

        throw new Error(`Error finding accrual schedule ${scheduleCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No accrual schedule ${scheduleCode} found in ODS`);
      }

      const schedule = storedProcedureJson.results[0] as GetAccrualScheduleOdsResponseDto;

      const mappedSchedule = mapAccrualSchedule(schedule);

      return mappedSchedule;
    } catch (error) {
      this.logger.error('Error finding accrual schedule in ODS %s %o', scheduleCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding accrual schedule ${scheduleCode} in ODS`, { cause: error });
    }
  }

  /**
   * Get all accrual schedules from ODS
   * @returns {Promise<GetAccrualScheduleOdsResponseDto[]>} Accrual schedules
   * @throws {InternalServerErrorException} If there is an error getting accrual schedules from ODS
   */
  async getAll(): Promise<GetAccrualScheduleResponseDto[]> {
    try {
      this.logger.info('Getting accrual schedules from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.CONFIGURATION_ACCRUAL_SCHEDULE,
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting accrual schedules from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting accrual schedules from ODS stored procedure');
      }

      const schedules = storedProcedureJson.results as GetAccrualScheduleOdsResponseDto[];

      const mappedSchedules = mapAccrualSchedules(schedules);

      return mappedSchedules;
    } catch (error) {
      this.logger.error('Error getting accrual schedules from ODS %o', error);

      throw new InternalServerErrorException('Error getting accrual schedules from ODS');
    }
  }
}
