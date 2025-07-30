import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';
import { mapBusinessCentreNonWorkingDays } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';

import {
  GetOdsBusinessCentreNonWorkingDayMappedResponse,
  GetOdsBusinessCentreNonWorkingDayResponse,
  GetOdsCustomerResponse,
  GetOdsDealResponse,
  ODS_ENTITIES,
  OdsEntity,
  OdsStoredProcedureInput,
  OdsStoredProcedureOutputBody,
  OdsStoredProcedureQueryParams,
} from './dto';

interface CreateOdsStoredProcedureInputParams {
  entityToQuery: OdsEntity;
  queryPageSize?: number;
  queryParameters?: OdsStoredProcedureQueryParams;
}

@Injectable()
export class OdsService {
  constructor(
    @InjectDataSource(DATABASE_NAME.ODS)
    private readonly odsDataSource: DataSource,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Finds a customer in ODS based on the provided URN
   * @param {string} uniqueReferenceNumber The customer URN to search for
   *
   * @returns {Promise<GetOdsCustomerResponse>} The customer response
   * @throws {InternalServerErrorException} If there is an error trying to find a customer
   * @throws {NotFoundException} If no matching customer is found
   */
  async findCustomer(uniqueReferenceNumber: string): Promise<GetOdsCustomerResponse> {
    try {
      const storedProcedureInput = this.createOdsStoredProcedureInput({
        entityToQuery: ODS_ENTITIES.CUSTOMER,
        queryPageSize: 1,
        queryParameters: { customer_party_unique_reference_number: uniqueReferenceNumber },
      });

      const storedProcedureResult = await this.callOdsStoredProcedure(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== 'SUCCESS') {
        this.logger.error('Error finding customer %s from ODS stored procedure, output %o', uniqueReferenceNumber, storedProcedureResult);

        throw new InternalServerErrorException(`Error finding customer ${uniqueReferenceNumber} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No customer found ${uniqueReferenceNumber}`);
      }

      const urn = storedProcedureJson.results[0]?.customer_party_unique_reference_number;
      const name = storedProcedureJson.results[0]?.customer_name;

      return {
        urn,
        name,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(`Error finding customer ${uniqueReferenceNumber}`);
    }
  }

  /**
   * Finds a deal in ODS based on provided deal ID
   * @param {string} id The deal ID to search for
   *
   * @returns {Promise<GetOdsDealResponse>} The deal response
   * @throws {InternalServerErrorException} If there is an error trying to find a deal
   * @throws {NotFoundException} If no matching deal is found
   */
  async findDeal(id: string): Promise<GetOdsDealResponse> {
    try {
      const storedProcedureInput = this.createOdsStoredProcedureInput({
        entityToQuery: ODS_ENTITIES.DEAL,
        queryPageSize: 1,
        queryParameters: { deal_code: id },
      });

      const storedProcedureResult = await this.callOdsStoredProcedure(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== 'SUCCESS') {
        this.logger.error('Error finding deal %s from ODS stored procedure, output %o', id, storedProcedureResult);

        throw new InternalServerErrorException(`Error finding deal ${id} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No deal found ${id}`);
      }

      const dealId = storedProcedureJson.results[0]?.deal_code;
      const name = storedProcedureJson.results[0]?.deal_name;
      const description = storedProcedureJson.results[0]?.deal_type_description;

      return {
        dealId,
        name,
        description,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(`Error finding deal ${id}`);
    }
  }

  /**
   * Find and map a business centre's non working days from ODS
   * @param {String} centreCode The business centre's code
   * @returns {Promise<GetOdsBusinessCentreNonWorkingDayMappedResponse[]>} Business centres
   * @throws {InternalServerErrorException} If there is an error finding a business centre's non working days
   */
  async findBusinessCentreNonWorkingDays(centreCode: string): Promise<GetOdsBusinessCentreNonWorkingDayMappedResponse[]> {
    try {
      const storedProcedureInput = this.createOdsStoredProcedureInput({
        entityToQuery: ODS_ENTITIES.BUSINESS_CENTRE_NON_WORKING_DAY,
        queryParameters: {
          business_centre_code: centreCode,
        },
      });

      const storedProcedureResult = await this.callOdsStoredProcedure(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== 'SUCCESS') {
        this.logger.error('Error getting business centre %s non working days from ODS stored procedure, output %o', centreCode, storedProcedureResult);

        throw new InternalServerErrorException(`Error getting business centre ${centreCode} non working days from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No business centre ${centreCode} non working days found`);
      }

      const nonWorkingDays = storedProcedureJson.results as GetOdsBusinessCentreNonWorkingDayResponse[];

      return mapBusinessCentreNonWorkingDays(nonWorkingDays);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(`Error getting business centre ${centreCode} non working days`);
    }
  }

  /**
   * Creates the input parameter for the stored procedure
   * @param {OdsEntity} entityToQuery The entity you want to query in ODS
   * @param {Number} queryPageSize The page size to query in ODS
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
