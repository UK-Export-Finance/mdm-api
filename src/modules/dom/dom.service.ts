import { Injectable } from '@nestjs/common';
import { MOCK_PRODUCT_CONFIGURATIONS } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';

import { GetDomProductConfigurationResponse } from './dto';

/**
 * DOM service.
 * This is responsible for all DOM operations.
 * NOTE: This service does not actually call DOM, all data is stored in APIM MDM.
 * In the future, this will be updated to call DOM
 */
@Injectable()
export class DomService {
  constructor(private readonly logger: PinoLogger) {}

  /**
   * Get all product configurations
   * @returns {GetDomProductConfigurationResponse[]}
   */
  getProductConfigurations(): GetDomProductConfigurationResponse[] {
    this.logger.info('Getting product configurations');

    return MOCK_PRODUCT_CONFIGURATIONS;
  }
}
