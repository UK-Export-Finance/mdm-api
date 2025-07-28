import { Injectable, NotFoundException } from '@nestjs/common';
import { DOM_BUSINESS_CENTRES, EXAMPLES } from '@ukef/constants';
import { mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { OdsService } from '../ods/ods.service';
import { GetDomBusinessCentreResponse, GetDomProductConfigurationResponse } from './dto';

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
   * Find a business centre from ODS.
   * @returns {GetDomBusinessCentreResponse}
   * @throws {NotFoundException} If no business centre is found
   */
  async findBusinessCentre(centreCode: string): Promise<GetDomBusinessCentreResponse> {
    try {
      this.logger.info('Finding DOM business centre %s', centreCode);

      const centre = await DOM_BUSINESS_CENTRES[`${centreCode}`];

      if (centre) {
        return centre;
      }

      throw new NotFoundException(`No business centre found ${centreCode}`);
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn(error);
        throw error;
      }

      this.logger.error('Error finding DOM business centre %s %o', centreCode, error);

      throw new Error(`Error finding DOM business centre ${centreCode}`, error);
    }
  }

  /**
   * Get all business centres from ODS and map into DOM data.
   * @returns {Promise<GetDomBusinessCentreResponse[]>}
   */
  async getBusinessCentres(): Promise<GetDomBusinessCentreResponse[]> {
    try {
      this.logger.info('Getting DOM business centres');

      const odsBusinessCentres = await this.odsService.getBusinessCentres();

      return mapBusinessCentres(odsBusinessCentres);
    } catch (error) {
      this.logger.error('Error getting DOM business centres %o', error);

      throw new Error('Error getting DOM business centres', error);
    }
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
