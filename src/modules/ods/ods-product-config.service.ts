import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';

import { GetProductConfigOdsResponse, ODS_ENTITIES, OdsStoredProcedureOutputBody } from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsProductConfigService {
  constructor(
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Get all product configs from ODS
   * @returns {Promise<GetProductConfigOdsResponse[]>} Product configs
   * @throws {InternalServerErrorException} If there is an error getting product configs from ODS
   */
  async getAll(): Promise<GetProductConfigOdsResponse[]> {
    try {
      this.logger.info('Getting product configs from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.CONFIGURATION_PRODUCT,
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting product configs from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting product configs from ODS stored procedure');
      }

      const productConfigs = storedProcedureJson.results as GetProductConfigOdsResponse[];

      return productConfigs;
    } catch (error) {
      this.logger.error('Error getting product configs from ODS %o', error);

      throw new InternalServerErrorException('Error getting product configs from ODS');
    }
  }
}
