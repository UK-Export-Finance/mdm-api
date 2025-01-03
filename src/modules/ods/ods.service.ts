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

  async findCustomer(partyUrn: string): Promise<GetOdsCustomerResponse> {
    try {
      const spInput = this.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, { customer_party_unique_reference_number: partyUrn });

      const result = await this.callOdsStoredProcedure(spInput);

      const resultJson = JSON.parse(result[0].output_body);

      if (!resultJson || resultJson?.status != 'SUCCESS') {
        throw new InternalServerErrorException('Error trying to find a customer');
      }

      if (resultJson?.total_result_count == 0) {
        throw new NotFoundException('No matching customer found');
      }

      return { customerUrn: resultJson.results[0].customer_party_unique_reference_number, name: resultJson.results[0].customer_name };
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

  createOdsStoredProcedureInput(entityToQuery: OdsEntity, queryParameters: odsStoredProcedureQueryParams): odsStoredProcedureInput {
    return {
      query_method: 'get',
      query_object: entityToQuery,
      query_page_size: 1,
      query_page_index: 1,
      query_parameters: queryParameters,
    };
  }

  async callOdsStoredProcedure(input: odsStoredProcedureInput): Promise<any> {
    const queryRunner = this.odsDataSource.createQueryRunner();
    try {
      // Use the query runner to call a stored procedure
      const result = await queryRunner.query(
        `
        DECLARE @output_body NVARCHAR(MAX);
        EXEC t_apim.sp_ODS_query @input_body=@0, @output_body=@output_body OUTPUT;
        SELECT @output_body as output_body
      `,
        [JSON.stringify(input)],
      );

      return result;
    } finally {
      queryRunner.release();
    }
  }
}
