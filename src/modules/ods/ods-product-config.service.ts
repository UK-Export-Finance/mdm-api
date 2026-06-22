import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
   * Find a product config by product type from ODS
   * @param {string} productType: Product type
   * @returns {Promise<GetProductConfigOdsResponse>} Product config
   * @throws {NotFoundException} If no product config is found
   * @throws {InternalServerErrorException} If there is an error getting the product config from ODS
   */
  async findOne(productType: string): Promise<GetProductConfigOdsResponse> {
    try {
      this.logger.info('Finding product config in ODS %s', productType);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.CONFIGURATION_PRODUCT,
        queryPageSize: 1,
        queryParameters: { productType },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding product config %s from ODS stored procedure, output %o', productType, storedProcedureResult);

        throw new Error(`Error finding product config ${productType} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No product config ${productType} found in ODS`);
      }

      return storedProcedureJson.results[0] as GetProductConfigOdsResponse;
    } catch (error) {
      this.logger.error('Error finding product config in ODS %s %o', productType, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding product config ${productType} in ODS`, { cause: error });
    }
  }

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
