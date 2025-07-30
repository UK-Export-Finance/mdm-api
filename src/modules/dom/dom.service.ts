import { Injectable, NotFoundException } from '@nestjs/common';
import { DOM_BUSINESS_CENTRES, EXAMPLES } from '@ukef/constants';
import { mapBusinessCentre, mapBusinessCentres } from '@ukef/helpers';
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
  findBusinessCentre(centreCode: string): GetDomBusinessCentreResponse {
    this.logger.info('Finding DOM business centre %s', centreCode);

    const centre = DOM_BUSINESS_CENTRES[`${centreCode}`];

    if (centre) {
      return mapBusinessCentre(centre);
    }

    throw new NotFoundException(`No business centre found ${centreCode}`);
  }

  /**
   * Get all business centres from ODS and map into DOM data.
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
