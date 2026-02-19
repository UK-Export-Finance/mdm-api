import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE_NAME, STORED_PROCEDURE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';

import { ODS_ENTITIES, OdsEntity, OdsStoredProcedureInput, OdsStoredProcedureOutputBody, OdsStoredProcedureQueryParams } from './dto';

interface CreateOdsStoredProcedureInputParams {
  entityToQuery: OdsEntity;
  queryPageSize?: number;
  queryParameters?: OdsStoredProcedureQueryParams;
}

@Injectable()
export class OdsAccrualsService {
  constructor(
    @InjectDataSource(DATABASE_NAME.ODS)
    private readonly odsDataSource: DataSource,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Get all accrual schedules from ODS
   * @returns {Promise<string[]>} TODO TODO TODO
   * @throws {InternalServerErrorException} If there is an error getting accrual schedules from ODS
   */
  async getSchedules(): Promise<string[]> {
    try {
      this.logger.info('Getting Accrual schedules from ODS');

      const storedProcedureInput = this.createOdsStoredProcedureInput({
        entityToQuery: ODS_ENTITIES.ACCRUAL_SCHEDULE,
      });

      const storedProcedureResult = await this.callOdsStoredProcedure(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting Accrual schedules from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting Accrual schedules from ODS stored procedure');
      }

      // const accrualSchedules = storedProcedureJson.results as GetIndustryOdsResponseDto[];

      // return accrualSchedules;
      return [''];
    } catch (error) {
      this.logger.error('Error getting Accrual schedules from ODS %o', error);

      throw new InternalServerErrorException('Error getting Accrual schedules from ODS');
    }
  }

  /**
   * Creates the input parameter for the stored procedure
   * @param {OdsEntity} entityToQuery The entity you want to query in ODS
   * @param {number} queryPageSize The page size to query in ODS
   * @param {OdsStoredProcedureQueryParams} queryParameters The query parameters and filters to apply to the query
   *
   * @returns {OdsStoredProcedureInput} The ODS stored procedure input in object format
   */
  createOdsStoredProcedureInput({ entityToQuery, queryPageSize, queryParameters }: CreateOdsStoredProcedureInputParams): OdsStoredProcedureInput {
    return {
      query_method: 'get',
      query_object: entityToQuery,
      query_page_size: queryPageSize,
      query_page_index: 1,
      query_parameters: queryParameters,
    };
  }

  /**
   * Calls the ODS stored procedure with the input provided and returns the output of it
   * @param {OdsStoredProcedureInput} storedProcedureInput The input parameter of the stored procedure
   *
   * @returns {Promise<OdsStoredProcedureOutput>} The result of the stored procedure
   */
  async callOdsStoredProcedure(storedProcedureInput: OdsStoredProcedureInput): Promise<string> {
    const queryRunner = this.odsDataSource.createQueryRunner();

    try {
      // Use the query runner to call a stored procedure
      const result = await queryRunner.query(
        `
        DECLARE @output_body NVARCHAR(MAX);
        EXEC t_apim.sp_ODS_query @input_body=@0, @output_body=@output_body OUTPUT;
        SELECT @output_body as output_body
      `,
        [JSON.stringify(storedProcedureInput)],
      );

      return result[0]?.output_body || null;
    } catch (error) {
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
