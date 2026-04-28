import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import PRODUCT_CONFIG from '@ukef/helper-modules/dom/dom-product-config.json';
import { mapBusinessCentreNonWorkingDays } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { OdsService } from '../ods/ods.service';
import {
  FindDomBusinessCentreNonWorkingDayMappedResponse,
  FindMultipleDomBusinessCentresNonWorkingDaysResponse,
  FindMultipleProductConfigsResponse,
  GetDomProductConfigResponse,
} from './dto';

// BUSINESS_CENTRE

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
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find a business centre's non working days in DOM
   * @param {string} domCentreCode: DOM business centre code
   * @returns {Promise<FindDomBusinessCentreNonWorkingDayMappedResponse[]>}
   * @throws {NotFoundException} If no business centre is found
   */
  async findBusinessCentreNonWorkingDays(domCentreCode: string): Promise<FindDomBusinessCentreNonWorkingDayMappedResponse[]> {
    try {
      this.logger.info('Finding DOM business centre %s non working days', domCentreCode);

      const nonWorkingDays = await this.odsService.findBusinessCentreNonWorkingDays(domCentreCode);

      return mapBusinessCentreNonWorkingDays(nonWorkingDays, domCentreCode);
    } catch (error) {
      const isNotFoundError =
        error instanceof NotFoundException || error?.['status'] === HttpStatus.NOT_FOUND || error?.['statusCode'] === HttpStatus.NOT_FOUND;

      if (isNotFoundError) {
        this.logger.warn('DOM business centre %s non working days not found %o', domCentreCode, error);

        throw new NotFoundException(`No DOM to ODS business centre code found ${domCentreCode}`);
      }

      this.logger.error('Error finding DOM business centre %s non working days %o', domCentreCode, error);

      throw new Error(`Error finding DOM business centre ${domCentreCode} non working days`, { cause: error });
    }
  }

  /**
   * Find multiple business centre's non working days in DOM
   * @param {string} centreCodes: DOM business centre codes, comma separated
   * @returns {Promise<FindMultipleDomBusinessCentresNonWorkingDaysResponse>}
   * @throws {NotFoundException} If no business centre is found
   */
  async findMultipleBusinessCentresNonWorkingDays(centreCodes: string): Promise<FindMultipleDomBusinessCentresNonWorkingDaysResponse> {
    try {
      this.logger.info(`Finding multiple DOM business centres non working days %s`, centreCodes);

      const mappedCentres = {};

      if (centreCodes.length) {
        const centreCodesArray = centreCodes.split(',');

        for (const domCentreCode of centreCodesArray) {
          mappedCentres[`${domCentreCode}`] = await this.findBusinessCentreNonWorkingDays(domCentreCode);
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
   * @returns {GetDomProductConfigResponse}
   */
  findProductConfiguration(productType: string): GetDomProductConfigResponse {
    this.logger.info('Finding DOM product configuration %s', productType);

    const productConfig = PRODUCT_CONFIG.find((config: GetDomProductConfigResponse) => config.productType === productType);

    if (productConfig) {
      return productConfig;
    }

    throw new NotFoundException(`No DOM product configuration found ${productType}`);
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
   * @returns {GetDomProductConfigResponse[]}
   */
  getProductConfigurations(productTypes?: string): GetDomProductConfigResponse[] {
    this.logger.info('Getting product configurations %s', productTypes);

    return PRODUCT_CONFIG;
  }
}
