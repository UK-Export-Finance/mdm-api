import { Injectable, NotFoundException } from '@nestjs/common';
import { DOM_BUSINESS_CENTRES, DOM_TO_ODS_BUSINESS_CENTRES_MAPPING } from '@ukef/constants';
import PRODUCT_CONFIG from '@ukef/helper-modules/dom/dom-product-config.json';
import { mapBusinessCentre, mapBusinessCentreNonWorkingDays, mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { OdsService } from '../ods/ods.service';
import {
  FindDomBusinessCentreNonWorkingDayMappedResponse,
  FindDomBusinessCentreResponse,
  FindMultipleDomBusinessCentresNonWorkingDaysResponse,
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
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find a business centre in DOM
   * @returns {FindDomBusinessCentreResponse}
   * @throws {NotFoundException} If no business centre is found
   */
  findBusinessCentre(centreCode: string): FindDomBusinessCentreResponse {
    this.logger.info('Finding DOM business centre %s', centreCode);

    const centre = DOM_BUSINESS_CENTRES[`${centreCode}`];

    if (centre) {
      return mapBusinessCentre(centre);
    }

    throw new NotFoundException(`No business centre found ${centreCode}`);
  }

  /**
   * Find a business centre's non working days in DOM
   * @param {string} domCentreCode: DOM business centre code
   * @returns {Promise<FindDomBusinessCentreNonWorkingDayMappedResponse[]>}
   * @throws {NotFoundException} If no business centre is found
   */
  async findBusinessCentreNonWorkingDays(domCentreCode: string): Promise<FindDomBusinessCentreNonWorkingDayMappedResponse[]> {
    try {
      this.logger.info('Finding DOM business centre %s non working days', domCentreCode);

      // get the business centre's ODS code from DOM code
      const odsCentreCode = DOM_TO_ODS_BUSINESS_CENTRES_MAPPING[`${domCentreCode}`];

      if (!odsCentreCode) {
        throw new NotFoundException(`No DOM to ODS business centre code found ${domCentreCode}`);
      }

      // get the non working days from ODS
      const nonWorkingDays = await this.odsService.findBusinessCentreNonWorkingDays(odsCentreCode);

      return mapBusinessCentreNonWorkingDays(nonWorkingDays, domCentreCode);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      }

      this.logger.error('Error finding DOM business centre %s non working days %o', domCentreCode, error);

      throw new Error(`Error finding DOM business centre ${domCentreCode} non working days`, error);
    }
  }

  /**
   * Get all business centres
   * @returns {FindDomBusinessCentreResponse[]}
   */
  getBusinessCentres(): FindDomBusinessCentreResponse[] {
    this.logger.info('Getting DOM business centres');

    const odsBusinessCentres = Object.values(DOM_BUSINESS_CENTRES);

    return mapBusinessCentres(odsBusinessCentres);
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

      throw new Error(`Error finding multiple DOM business centre ${centreCodes} non working days`, error);
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
   * Get all product configurations
   * @returns {GetDomProductConfigResponse[]}
   */
  getProductConfigurations(): GetDomProductConfigResponse[] {
    this.logger.info('Getting product configurations');

    return PRODUCT_CONFIG;
  }
}
