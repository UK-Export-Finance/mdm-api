import { Injectable } from '@nestjs/common';
import { MOCK_PRODUCT_CONFIGURATIONS } from '@ukef/constants';
import { mapBusinessCentres } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { OdsService } from '../ods/ods.service';
import { GetDomBusinessCentreMappedResponse, GetDomProductConfigurationResponse } from './dto';

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
   * Get all business centres from ODS and map into DOM data.
   * @returns {Promise<GetDomBusinessCentreMappedResponse[]>}
   */
  async getBusinessCentres(): Promise<GetDomBusinessCentreMappedResponse[]> {
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

    return MOCK_PRODUCT_CONFIGURATIONS;
  }
}
