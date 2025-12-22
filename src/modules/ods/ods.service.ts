import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';
import { mapIndustries, mapIndustry } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';
import { DataSource } from 'typeorm';

import {
  GetOdsBusinessCentreNonWorkingDayResponse,
  GetOdsCustomerResponse,
  GetOdsDealResponse,
  GetOdsIndustryOdsResponseDto,
  GetOdsIndustryResponseDto,
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
   * @param {string} centreCode The business centre's code
   * @returns {Promise<GetOdsBusinessCentreNonWorkingDayResponse[]>} Business centres
   * @throws {InternalServerErrorException} If there is an error finding a business centre's non working days
   */
  async findBusinessCentreNonWorkingDays(centreCode: string): Promise<GetOdsBusinessCentreNonWorkingDayResponse[]> {
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

      return nonWorkingDays;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(`Error getting business centre ${centreCode} non working days`);
    }
  }

  // TODO: info log for all methods in this service

  /**
   * Get all UKEF industries from ODS
   * @returns {Promise<GetOdsIndustryResponseDto[]>} Mapped UKEF industry codes
   * @throws {InternalServerErrorException} If there is an error getting UKEF industry codes
   */
  async getUkefIndustryCodes(): Promise<any> {
    try {
      this.logger.info('Finding ODS UKEF industry codes');

      const storedProcedureInput = this.createOdsStoredProcedureInput({
        entityToQuery: ODS_ENTITIES.INDUSTRY,
        queryParameters: { industry_category: 'UKEF' },
      });

      const storedProcedureResult = await this.callOdsStoredProcedure(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== 'SUCCESS') {
        this.logger.error('Error getting UKEF industry codes from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting UKEF industry codes from ODS stored procedure');
      }

      const industries = storedProcedureJson.results as GetOdsIndustryOdsResponseDto[];

      const mappedIndustries = mapIndustries(industries);

      return mappedIndustries;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      }

      this.logger.error(error);
      this.logger.error('Error getting ODS UKEF industry codes %o', error);

      throw new InternalServerErrorException('Error getting ODS UKEF industry codes');
    }
  }

  // TODO: industry code or just "industry"?

  /**
   * Find a UKEF industry code
   * @param {string} industryCode: ODS UKEF industry code
   * @returns {Promise<GetOdsIndustryResponseDto[]>}
   * @throws {NotFoundException} If no UKEF industry code is found
   */
  async findUkefIndustryCode(industryCode: string): Promise<GetOdsIndustryResponseDto> {
    try {
      this.logger.info('Finding ODS UKEF industry code %s', industryCode);

      const storedProcedureInput = this.createOdsStoredProcedureInput({
        entityToQuery: ODS_ENTITIES.INDUSTRY,
        queryPageSize: 1,
        queryParameters: {
          industry_category: 'UKEF',
          industry_code: industryCode,
        },
      });

      const storedProcedureResult = await this.callOdsStoredProcedure(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== 'SUCCESS') {
        this.logger.error('Error finding ODS UKEF industry code %s from ODS stored procedure, output %o', industryCode, storedProcedureResult);

        throw new InternalServerErrorException(`Error finding ODS UKEF industry code ${industryCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No ODS UKEF industry code ${industryCode} found`);
      }

      const industry = storedProcedureJson.results[0] as GetOdsIndustryOdsResponseDto;

      return mapIndustry(industry);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      }

      this.logger.error('Error finding ODS UKEF industry code %s %o', industryCode, error);

      throw new Error(`Error finding ODS UKEF industry code ${industryCode}`, error);
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
