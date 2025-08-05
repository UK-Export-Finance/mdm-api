import { Injectable, NotFoundException } from '@nestjs/common';
import { DOM_BUSINESS_CENTRES, EXAMPLES } from '@ukef/constants';
import { mapBusinessCentre, mapBusinessCentreNonWorkingDays, mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { OdsService } from '../ods/ods.service';
import { GetDomBusinessCentreNonWorkingDayMappedResponse, GetDomBusinessCentreResponse, GetDomProductConfigurationResponse } from './dto';

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
   * @returns {GetDomBusinessCentreResponse}
   * @throws {NotFoundException} If no business centre is found
   */
  findBusinessCentre(centreCode: string): GetDomBusinessCentreResponse {
    this.logger.info('Finding DOM business centre %s', centreCode);

    const centre = DOM_BUSINESS_CENTRES[`${centreCode}`];

    if (centre) {
      return mapBusinessCentre(centre);
    }

    throw new NotFoundException(`No business centre found ${centreCode}`);
  }

  /**
   * Find a business centre's non working days in DOM
   * @returns {GetDomBusinessCentreNonWorkingDayMappedResponse[]}
   * @throws {NotFoundException} If no business centre is found
   */
  async findBusinessCentreNonWorkingDays(domCentreCode: string): Promise<GetDomBusinessCentreNonWorkingDayMappedResponse[]> {
    try {
      this.logger.info('Getting DOM business centre %s non working days', domCentreCode);

      // get the business centre in ODS
      const odsCentre = this.findBusinessCentre(domCentreCode);

      // get the non working days from ODS
      const nonWorkingDays = await this.odsService.findBusinessCentreNonWorkingDays(odsCentre.code);

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
   * @returns {GetDomBusinessCentreResponse[]}
   */
  getBusinessCentres(): GetDomBusinessCentreResponse[] {
    this.logger.info('Getting DOM business centres');

    const odsBusinessCentres = Object.values(DOM_BUSINESS_CENTRES);

    return mapBusinessCentres(odsBusinessCentres);
  }

  /**
   * Get all product configurations
   * @returns {GetDomProductConfigurationResponse[]}
   */
  getProductConfigurations(): GetDomProductConfigurationResponse[] {
    this.logger.info('Getting product configurations');

    return EXAMPLES.DOM.PRODUCT_CONFIGURATIONS;
  }
}
