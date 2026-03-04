import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapOdsClassification, mapOdsClassifications } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { GetFacilityCategoryOdsResponseDto, GetFacilityCategoryResponseDto, ODS_ENTITIES, OdsStoredProcedureOutputBody } from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsFacilityCategoryService {
  constructor(
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find a facility category by code
   * @param {string} categoryCode: Category code
   * @returns {Promise<GetFacilityCategoryResponseDto>}
   * @throws {NotFoundException} If no facility category is found
   */
  async findOne(categoryCode: string): Promise<GetFacilityCategoryResponseDto> {
    try {
      this.logger.info('Finding facility category in ODS %s', categoryCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.FACILITY_CLASSIFICATION,
        queryPageSize: 1,
        queryParameters: {
          classification_code: categoryCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding facility category %s from ODS stored procedure, output %o', categoryCode, storedProcedureResult);

        throw new Error(`Error finding facility category ${categoryCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No facility category ${categoryCode} found in ODS`);
      }

      const category = storedProcedureJson.results[0] as GetFacilityCategoryOdsResponseDto;

      return mapOdsClassification(category);
    } catch (error) {
      this.logger.error('Error finding facility category in ODS %s %o', categoryCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding facility category ${categoryCode} in ODS`, { cause: error });
    }
  }

  /**
   * Get all facility categories from ODS
   * @returns {Promise<GetFacilityCategoryResponseDto[]>} Facility categories
   * @throws {InternalServerErrorException} If there is an error getting facility categories from ODS
   */
  async getAll(): Promise<GetFacilityCategoryResponseDto[]> {
    try {
      this.logger.info('Getting facility categories from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.FACILITY_CLASSIFICATION,
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting facility categories from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting facility categories from ODS stored procedure');
      }

      const facilityCategories = storedProcedureJson.results as GetFacilityCategoryOdsResponseDto[];

      const mappedCategories = mapOdsClassifications(facilityCategories);

      return mappedCategories;
    } catch (error) {
      this.logger.error('Error getting facility categories from ODS %o', error);

      throw new InternalServerErrorException('Error getting facility categories from ODS');
    }
  }
}
