import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapOdsClassification, mapOdsClassifications } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { GetObligationSubtypeOdsResponseDto, GetObligationSubtypeResponseDto, ODS_ENTITIES, ODS_QUERY_PARAM_VALUES, OdsStoredProcedureOutputBody } from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsObligationSubtypeService {
  constructor(
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find an obligation subtype by code
   * @param {string} subtypeCode: Sub-type code
   * @returns {Promise<GetObligationSubtypeResponseDto>}
   * @throws {NotFoundException} If no obligation subtype is found
   */
  async findOne(subtypeCode: string): Promise<GetObligationSubtypeResponseDto> {
    try {
      this.logger.info('Finding obligation subtype in ODS %s', subtypeCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.OBLIGATION_CLASSIFICATION,
        queryPageSize: 1,
        queryParameters: {
          classification_type_code: ODS_QUERY_PARAM_VALUES.OBLIGATION_SUBTYPE,
          classification_code: subtypeCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding obligation subtype %s from ODS stored procedure, output %o', subtypeCode, storedProcedureResult);

        throw new Error(`Error finding obligation subtype ${subtypeCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No obligation subtype ${subtypeCode} found in ODS`);
      }

      const subType = storedProcedureJson.results[0] as GetObligationSubtypeOdsResponseDto;

      return mapOdsClassification(subType);
    } catch (error) {
      this.logger.error('Error finding obligation subtype in ODS %s %o', subtypeCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding obligation subtype ${subtypeCode} in ODS`, { cause: error });
    }
  }

  /**
   * Get all obligation subtypes from ODS
   * @returns {Promise<GetObligationSubtypeResponseDto[]>} Obligation subtypes
   * @throws {InternalServerErrorException} If there is an error getting obligation subtypes from ODS
   */
  async getAll(): Promise<GetObligationSubtypeResponseDto[]> {
    try {
      this.logger.info('Getting obligation subtypes from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.OBLIGATION_CLASSIFICATION,
        queryParameters: {
          classification_type_code: ODS_QUERY_PARAM_VALUES.OBLIGATION_SUBTYPE,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting obligation subtypes from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting obligation subtypes from ODS stored procedure');
      }

      const obligationSubtypes = storedProcedureJson.results as GetObligationSubtypeOdsResponseDto[];

      const mappedSubtypes = mapOdsClassifications(obligationSubtypes);

      return mappedSubtypes;
    } catch (error) {
      this.logger.error('Error getting obligation subtypes from ODS %o', error);

      throw new InternalServerErrorException('Error getting obligation subtypes from ODS');
    }
  }
}
