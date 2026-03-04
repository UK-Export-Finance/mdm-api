import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapIndustries, mapIndustry, mapIndustryCodes } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import {
  GetIndustryOdsResponseDto,
  GetIndustryResponseDto,
  GetOdsBusinessCentreNonWorkingDayResponse,
  GetOdsCustomerResponse,
  GetOdsDealResponse,
  ODS_ENTITIES,
  OdsStoredProcedureOutputBody,
} from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsService {
  constructor(
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
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
      this.logger.info('Finding customer %s in ODS', uniqueReferenceNumber);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.CUSTOMER,
        queryPageSize: 1,
        queryParameters: { customer_party_unique_reference_number: uniqueReferenceNumber },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding customer %s from ODS stored procedure, output %o', uniqueReferenceNumber, storedProcedureResult);

        throw new InternalServerErrorException(`Error finding customer ${uniqueReferenceNumber} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No customer found ${uniqueReferenceNumber} in ODS`);
      }

      const urn = storedProcedureJson.results[0]?.customer_party_unique_reference_number;
      const name = storedProcedureJson.results[0]?.customer_name;

      return {
        urn,
        name,
      };
    } catch (error) {
      this.logger.error('Error finding customer %s in ODS %o', uniqueReferenceNumber, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding customer ${uniqueReferenceNumber} in ODS`);
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
      this.logger.info('Finding deal %s in ODS', id);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.DEAL,
        queryPageSize: 1,
        queryParameters: { deal_code: id },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding deal %s from ODS stored procedure, output %o', id, storedProcedureResult);

        throw new InternalServerErrorException(`Error finding deal ${id} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No deal found ${id} in ODS`);
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
      this.logger.error('Error finding deal %s in ODS %o', id, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(`Error finding deal ${id} in ODS`);
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
      this.logger.info('Finding business centre %s non working days in ODS', centreCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.BUSINESS_CENTRE_NON_WORKING_DAY,
        queryParameters: {
          business_centre_code: centreCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding business centre %s non working days from ODS stored procedure, output %o', centreCode, storedProcedureResult);

        throw new InternalServerErrorException(`Error finding business centre ${centreCode} non working days from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No business centre ${centreCode} non working days found in ODS`);
      }

      const nonWorkingDays = storedProcedureJson.results as GetOdsBusinessCentreNonWorkingDayResponse[];

      return nonWorkingDays;
    } catch (error) {
      this.logger.error('Finding business centre %s non working days in ODS %o', centreCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      this.logger.error(error);
      throw new InternalServerErrorException(`Error finding business centre ${centreCode} non working days in ODS`);
    }
  }

  /**
   * Find a UKEF industry by industry code
   * @param {string} industryCode: UKEF industry code
   * @returns {Promise<GetIndustryResponseDto>}
   * @throws {NotFoundException} If no UKEF industry is found
   */
  async findUkefIndustry(industryCode: string): Promise<GetIndustryResponseDto> {
    try {
      this.logger.info('Finding UKEF industry in ODS %s', industryCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.INDUSTRY,
        queryPageSize: 1,
        queryParameters: {
          industry_category: 'UKEF',
          industry_code: industryCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding UKEF industry %s from ODS stored procedure, output %o', industryCode, storedProcedureResult);

        throw new Error(`Error finding UKEF industry ${industryCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No UKEF industry ${industryCode} found in ODS`);
      }

      const industry = storedProcedureJson.results[0] as GetIndustryOdsResponseDto;

      return mapIndustry(industry);
    } catch (error) {
      this.logger.error('Error finding UKEF industry in ODS %s %o', industryCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding UKEF industry ${industryCode} in ODS`, { cause: error });
    }
  }

  /**
   * Get all UKEF industries from ODS
   * @returns {Promise<GetIndustryResponseDto[]>} Mapped UKEF industries
   * @throws {InternalServerErrorException} If there is an error getting UKEF industries
   */
  async getUkefIndustries(): Promise<GetIndustryResponseDto[]> {
    try {
      this.logger.info('Getting UKEF industries from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.INDUSTRY,
        queryParameters: { industry_category: 'UKEF' },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting UKEF industries from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting UKEF industries from ODS stored procedure');
      }

      const industries = storedProcedureJson.results as GetIndustryOdsResponseDto[];

      const mappedIndustries = mapIndustries(industries);

      return mappedIndustries;
    } catch (error) {
      this.logger.error('Error getting UKEF industries %o', error);

      throw new InternalServerErrorException('Error getting UKEF industries from ODS');
    }
  }

  /**
   * Get all UKEF industries codes from ODS
   * @returns {Promise<string[]>} UKEF industry codes
   * @throws {InternalServerErrorException} If there is an error getting UKEF industry codes
   */
  async getUkefIndustryCodes(): Promise<string[]> {
    try {
      this.logger.info('Getting UKEF industry codes from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.INDUSTRY,
        queryParameters: { industry_category: 'UKEF' },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting UKEF industry codes from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting UKEF industry codes from ODS stored procedure');
      }

      const industries = storedProcedureJson.results as GetIndustryOdsResponseDto[];

      const industryCodes = mapIndustryCodes(industries);

      return industryCodes;
    } catch (error) {
      this.logger.error('Error getting UKEF industry codes from ODS %o', error);

      throw new InternalServerErrorException('Error getting UKEF industry codes from ODS');
    }
  }
}
