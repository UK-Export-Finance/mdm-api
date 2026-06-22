import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { mapBusinessCentreNonWorkingDays, mapProductConfig } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { OdsService } from '../ods/ods.service';
import { OdsProductConfigService } from '../ods/ods-product-config.service';
import {
  FindMultipleOdsBusinessCentreOdsResponsesNonWorkingDaysResponse,
  FindMultipleProductConfigsResponse,
  FindOdsBusinessCentreOdsResponseNonWorkingDayMappedResponse,
  GetDomProductConfigResponse,
} from './dto';

/**
 * DOM service.
 * This is responsible for all DOM operations.
 * NOTE: This service does not actually call DOM, all data is stored in APIM MDM.
 * In the future, this will be updated to call DOM.
 */
@Injectable()
export class DomService {
  constructor(
    private readonly odsService: OdsService,
    private readonly odsProductConfigService: OdsProductConfigService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find a business centre's non working days in DOM
   * @param {string} domCentreCode: DOM business centre code
   * @param {string} startDate: Optional non working day start date filter (inclusive) in YYYY-MM-DD format
   * @param {string} endDate: Optional non working day end date filter (inclusive) in YYYY-MM-DD format
   * @returns {Promise<FindOdsBusinessCentreOdsResponseNonWorkingDayMappedResponse[]>}
   * @throws {NotFoundException} If no business centre is found
   */
  async findBusinessCentreNonWorkingDays(
    domCentreCode: string,
    startDate?: string,
    endDate?: string,
  ): Promise<FindOdsBusinessCentreOdsResponseNonWorkingDayMappedResponse[]> {
    try {
      this.logger.info('Finding DOM business centre %s non working days', domCentreCode);

      const nonWorkingDays = await this.odsService.findBusinessCentreNonWorkingDays(domCentreCode, startDate, endDate);

      return mapBusinessCentreNonWorkingDays(nonWorkingDays, domCentreCode);
    } catch (error) {
      const isNotFoundError =
        error instanceof NotFoundException || error?.['status'] === HttpStatus.NOT_FOUND || error?.['statusCode'] === HttpStatus.NOT_FOUND;

      if (isNotFoundError) {
        this.logger.warn('DOM business centre %s non working days not found %o', domCentreCode, error);

        throw new NotFoundException(`No DOM business centre non working days found ${domCentreCode}`);
      }

      this.logger.error('Error finding DOM business centre %s non working days %o', domCentreCode, error);

      throw new Error(`Error finding DOM business centre ${domCentreCode} non working days`, { cause: error });
    }
  }

  /**
   * Find multiple business centre's non working days in DOM
   * @param {string} centreCodes: DOM business centre codes, comma separated
   * @param {string} startDate: Optional non working day start date filter (inclusive) in YYYY-MM-DD format
   * @param {string} endDate: Optional non working day end date filter (inclusive) in YYYY-MM-DD format
   * @returns {Promise<FindMultipleOdsBusinessCentreOdsResponsesNonWorkingDaysResponse>}
   * @throws {NotFoundException} If no business centre is found
   */
  async findMultipleBusinessCentresNonWorkingDays(
    centreCodes: string,
    startDate?: string,
    endDate?: string,
  ): Promise<FindMultipleOdsBusinessCentreOdsResponsesNonWorkingDaysResponse> {
    try {
      this.logger.info(`Finding multiple DOM business centres non working days %s`, centreCodes);

      const mappedCentres = {};

      if (centreCodes.length) {
        const centreCodesArray = centreCodes.split(',');

        for (const domCentreCode of centreCodesArray) {
          mappedCentres[`${domCentreCode}`] = await this.findBusinessCentreNonWorkingDays(domCentreCode, startDate, endDate);
        }
      }

      return mappedCentres;
    } catch (error) {
      this.logger.error('Error finding multiple DOM business centre %s non working days %o', centreCodes, error);

      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Error finding multiple DOM business centre ${centreCodes} non working days`, error);
      }

      throw new Error(`Error finding multiple DOM business centre ${centreCodes} non working days`, { cause: error });
    }
  }

  /**
   * Find a product configuration
   * @param {string} productType: Product type
   * @returns {Promise<GetDomProductConfigResponse>}
   * @throws {NotFoundException} If no product configuration is found
   */
  async findProductConfiguration(productType: string): Promise<GetDomProductConfigResponse> {
    try {
      this.logger.info('Finding DOM product configuration %s', productType);

      const odsProductConfig = await this.odsProductConfigService.findOne(productType);

      return mapProductConfig(odsProductConfig);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn('DOM product configuration %s not found %o', productType, error);

        throw new NotFoundException(`No DOM product configuration found ${productType}`);
      }

      this.logger.error('Error finding DOM product configuration %s %o', productType, error);

      throw new Error(`Error finding DOM product configuration ${productType}`, { cause: error });
    }
  }

  /**
   * Find multiple product configurations in DOM
   * @param {string} productTypes: DOM product types, comma separated
   * @returns {Promise<FindMultipleProductConfigsResponse>}
   * @throws {NotFoundException} If no product configuration is found
   */
  async findMultipleProductConfigurations(productTypes: string): Promise<FindMultipleProductConfigsResponse> {
    try {
      this.logger.info(`Finding multiple DOM product configurations %s`, productTypes);

      const mappedConfigs = {};

      if (productTypes.length) {
        const productTypesArray = productTypes.split(',');

        for (const productType of productTypesArray) {
          mappedConfigs[`${productType}`] = await this.findProductConfiguration(productType);
        }
      }

      return mappedConfigs;
    } catch (error) {
      this.logger.error('Error finding multiple DOM product configurations %s %o', productTypes, error);

      if (error instanceof NotFoundException) {
        throw new NotFoundException(`Error finding multiple DOM product configurations ${productTypes}`, error);
      }

      throw new Error(`Error finding multiple DOM product configurations ${productTypes}`, { cause: error });
    }
  }

  /**
   * Get all product configurations
   * @returns {Promise<GetDomProductConfigResponse[]>}
   */
  async getProductConfigurations(): Promise<GetDomProductConfigResponse[]> {
    try {
      this.logger.info('Getting product configurations');

      const odsProductConfigs = await this.odsProductConfigService.getAll();

      return odsProductConfigs.map(mapProductConfig);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn('DOM product configurations not found %o', error);

        throw new NotFoundException(`No DOM product configurations found`, error);
      }

      this.logger.error('Error getting DOM product configurations %o', error);

      throw new Error(`Error getting DOM product configurations`, { cause: error });
    }
  }
}
