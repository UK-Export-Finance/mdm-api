import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';
import { CreateOdsStoredProcedureInputParams } from '@ukef/typings';
import { DataSource } from 'typeorm';

import { OdsStoredProcedureInput } from './dto';

@Injectable()
export class OdsStoredProcedureService {
  constructor(
    @InjectDataSource(DATABASE_NAME.ODS)
    private readonly odsDataSource: DataSource,
  ) {}

  /**
   * Creates the input parameter for the stored procedure
   * @param {OdsEntity} entityToQuery The entity you want to query in ODS
   * @param {number} queryPageSize The page size to query in ODS
   * @param {OdsStoredProcedureQueryParams} queryParameters The query parameters and filters to apply to the query
   *
   * @returns {OdsStoredProcedureInput} The ODS stored procedure input in object format
   */
  createInput({ entityToQuery, queryPageSize, queryParameters }: CreateOdsStoredProcedureInputParams): OdsStoredProcedureInput {
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
  async call(storedProcedureInput: OdsStoredProcedureInput): Promise<string> {
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
