import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GetOdsCustomerResponse } from './dto/get-ods-customer-response.dto';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';
import { DataSource } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';
import { ODS_ENTITIES, OdsEntity, odsStoredProcedureInput, odsStoredProcedureQueryParams } from './dto/ods-payloads.dto';

@Injectable()
export class OdsService {
  constructor(
    @InjectDataSource(DATABASE.ODS)
    private readonly odsDataSource: DataSource,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Calls the ODS stored procedure with the input provided and returns the output of it
   * @param {string} urn The input parameter of the stored procedure
   *
   * @returns {Promise<GetOdsCustomerResponse>} The result of the stored procedure
   */
  async findCustomer(urn: string): Promise<GetOdsCustomerResponse> {
    try {
      const spInput = this.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, { customer_party_unique_reference_number: urn });

      const storedProcedureResult = await this.callOdsStoredProcedure(spInput);

      const storedProcedureJson = JSON.parse(storedProcedureResult[0]?.output_body);

      if (storedProcedureJson == undefined || storedProcedureJson?.status != 'SUCCESS') {
        this.logger.error('Error from ODS stored procedure, output: %o', storedProcedureResult);
        throw new InternalServerErrorException('Error trying to find a customer');
      }

      if (storedProcedureJson?.total_result_count == 0) {
        throw new NotFoundException('No matching customer found');
      }

      return {
        urn: storedProcedureJson.results[0]?.customer_party_unique_reference_number,
        name: storedProcedureJson.results[0]?.customer_name,
      };
    } catch (err) {
      if (err instanceof NotFoundException) {
        this.logger.warn(err);
        throw err;
      } else {
        this.logger.error(err);
        throw new InternalServerErrorException('Error trying to find a customer');
      }
    }
  }

  /**
   * Creates the input parameter for the stored procedure
   * @param {OdsEntity} entityToQuery The entity you want to query in ODS
   * @param {odsStoredProcedureQueryParams} queryParameters The query parameters and filters to apply to the query
   *
   * @returns {odsStoredProcedureInput} The ODS stored procedure input in object format
   */
  createOdsStoredProcedureInput(entityToQuery: OdsEntity, queryParameters: odsStoredProcedureQueryParams): odsStoredProcedureInput {
    return {
      query_method: 'get',
      query_object: entityToQuery,
      query_page_size: 1,
      query_page_index: 1,
      query_parameters: queryParameters,
    };
  }

  /**
   * Calls the ODS stored procedure with the input provided and returns the output of it
   * @param {odsStoredProcedureInput} storedProcedureInput The input parameter of the stored procedure
   *
   * @returns {Promise<any>} The result of the stored procedure
   */
  async callOdsStoredProcedure(storedProcedureInput: odsStoredProcedureInput): Promise<any> {
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

      return result;
    } finally {
      queryRunner.release();
    }
  }
}
