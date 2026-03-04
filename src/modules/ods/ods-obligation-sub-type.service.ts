import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapOdsClassification, mapOdsClassifications } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { GetObligationSubTypeOdsResponseDto, GetObligationSubTypeResponseDto, ODS_ENTITIES, ODS_QUERY_PARAM_VALUES, OdsStoredProcedureOutputBody } from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsObligationSubTypeService {
  constructor(
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find an obligation sub-type by code
   * @param {string} subTypeCode: Sub-type code
   * @returns {Promise<GetObligationSubTypeResponseDto>}
   * @throws {NotFoundException} If no obligation sub-type is found
   */
  async findOne(subTypeCode: string): Promise<GetObligationSubTypeResponseDto> {
    try {
      this.logger.info('Finding obligation sub-type in ODS %s', subTypeCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.OBLIGATION_CLASSIFICATION,
        queryPageSize: 1,
        queryParameters: {
          classification_type_code: ODS_QUERY_PARAM_VALUES.OBLIGATION_SUB_TYPE,
          classification_code: subTypeCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding obligation sub-type %s from ODS stored procedure, output %o', subTypeCode, storedProcedureResult);

        throw new Error(`Error finding obligation sub-type ${subTypeCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No obligation sub-type ${subTypeCode} found in ODS`);
      }

      const subType = storedProcedureJson.results[0] as GetObligationSubTypeOdsResponseDto;

      return mapOdsClassification(subType);
    } catch (error) {
      this.logger.error('Error finding obligation sub-type in ODS %s %o', subTypeCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding obligation sub-type ${subTypeCode} in ODS`, { cause: error });
    }
  }

  /**
   * Get all obligation sub-types from ODS
   * @returns {Promise<GetObligationSubTypeResponseDto[]>} Obligation sub-types
   * @throws {InternalServerErrorException} If there is an error getting obligation sub-types from ODS
   */
  async getAll(): Promise<GetObligationSubTypeResponseDto[]> {
    try {
      this.logger.info('Getting obligation sub-types from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.OBLIGATION_CLASSIFICATION,
        queryParameters: {
          classification_type_code: ODS_QUERY_PARAM_VALUES.OBLIGATION_SUB_TYPE,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting obligation sub-types from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting obligation sub-types from ODS stored procedure');
      }

      const obligationSubTypes = storedProcedureJson.results as GetObligationSubTypeOdsResponseDto[];

      const mappedSubTypes = mapOdsClassifications(obligationSubTypes);

      return mappedSubTypes;
    } catch (error) {
      this.logger.error('Error getting obligation sub-types from ODS %o', error);

      throw new InternalServerErrorException('Error getting obligation sub-types from ODS');
    }
  }
}
