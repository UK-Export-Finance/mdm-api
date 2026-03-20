import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapAccrualFrequencies, mapAccrualFrequency, mapOdsClassification, mapOdsClassifications } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import {
  GetAccrualFrequencyOdsResponseDto,
  GetAccrualFrequencyResponseDto,
  GetAccrualScheduleClassificationOdsResponseDto,
  GetAccrualScheduleClassificationResponseDto,
  ODS_ENTITIES,
  OdsScheduleClassificationTypeCodes,
  OdsStoredProcedureOutputBody,
} from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsAccrualsService {
  constructor(
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find an accrual frequency by frequency code
   * @param {string} frequencyCode: Frequency code
   * @returns {Promise<GetAccrualFrequencyResponseDto>}
   * @throws {NotFoundException} If no accrual schedule frequency is found
   */
  async findAccrualFrequency(frequencyCode: string): Promise<GetAccrualFrequencyResponseDto> {
    try {
      this.logger.info('Finding accrual frequency in ODS %s', frequencyCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.CONFIGURATION_FREQUENCY,
        queryPageSize: 1,
        queryParameters: {
          frequencyCode: frequencyCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding accrual frequency %s from ODS stored procedure, output %o', frequencyCode, storedProcedureResult);

        throw new Error(`Error finding accrual frequency ${frequencyCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No accrual frequency ${frequencyCode} found in ODS`);
      }

      const frequency = storedProcedureJson.results[0] as GetAccrualFrequencyOdsResponseDto;

      return mapAccrualFrequency(frequency);
    } catch (error) {
      this.logger.error('Error finding accrual frequency in ODS %s %o', frequencyCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding accrual frequency ${frequencyCode} in ODS`, { cause: error });
    }
  }

  /**
   * Get all accrual frequencies from ODS
   * @returns {Promise<GetAccrualFrequencyResponseDto[]>} Accrual frequencies
   * @throws {InternalServerErrorException} If there is an error getting accrual frequencies from ODS
   */
  async getAccrualFrequencies(): Promise<GetAccrualFrequencyResponseDto[]> {
    try {
      this.logger.info('Getting accrual frequencies from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.CONFIGURATION_FREQUENCY,
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting accrual frequencies from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting accrual frequencies from ODS stored procedure');
      }

      const frequencies = storedProcedureJson.results as GetAccrualFrequencyOdsResponseDto[];

      const mappedFrequencies = mapAccrualFrequencies(frequencies);

      return mappedFrequencies;
    } catch (error) {
      this.logger.error('Error getting accrual frequencies from ODS %o', error);

      throw new InternalServerErrorException('Error getting accrual frequencies from ODS');
    }
  }

  /**
   * Find an accrual schedule classification by classification code
   * @param {string} classificationTypeCode: Classification type code
   * @param {string} classificationCode: Classification code
   * @returns {Promise<GetAccrualScheduleClassificationResponseDto>}
   * @throws {NotFoundException} If no accrual schedule classification is found
   */
  async findScheduleClassification(
    classificationTypeCode: OdsScheduleClassificationTypeCodes,
    classificationCode: string,
  ): Promise<GetAccrualScheduleClassificationResponseDto> {
    try {
      this.logger.info('Finding accrual schedule classification in ODS %s', classificationCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.ACCRUAL_SCHEDULE_CLASSIFICATION,
        queryPageSize: 1,
        queryParameters: {
          classification_type_code: classificationTypeCode,
          classification_code: classificationCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding accrual schedule classification %s from ODS stored procedure, output %o', classificationCode, storedProcedureResult);

        throw new Error(`Error finding accrual schedule classification ${classificationCode} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No accrual schedule classification ${classificationCode} found in ODS`);
      }

      const classification = storedProcedureJson.results[0] as GetAccrualScheduleClassificationOdsResponseDto;

      return mapOdsClassification(classification);
    } catch (error) {
      this.logger.error('Error finding accrual schedule classification in ODS %s %o', classificationCode, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding accrual schedule classification ${classificationCode} in ODS`, { cause: error });
    }
  }

  /**
   * Get all accrual schedule classifications from ODS
   * @param {OdsScheduleClassificationTypeCodes} classificationTypeCode: Classification type code
   * @returns {Promise<GetAccrualScheduleClassificationResponseDto[]>} Accrual schedule classifications
   * @throws {InternalServerErrorException} If there is an error getting accrual schedule classifications from ODS
   */
  async getScheduleClassifications(classificationTypeCode: OdsScheduleClassificationTypeCodes): Promise<GetAccrualScheduleClassificationResponseDto[]> {
    try {
      this.logger.info('Getting accrual schedule classifications from ODS %s', classificationTypeCode);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.ACCRUAL_SCHEDULE_CLASSIFICATION,
        queryParameters: {
          classification_type_code: classificationTypeCode,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error(
          'Error getting accrual schedule classifications from ODS stored procedure %s, output %o',
          classificationTypeCode,
          storedProcedureResult,
        );

        throw new InternalServerErrorException(`Error getting accrual schedule classifications from ODS stored procedure ${classificationTypeCode}`);
      }

      const classifications = storedProcedureJson.results as GetAccrualScheduleClassificationOdsResponseDto[];

      const mappedClassification = mapOdsClassifications(classifications);

      return mappedClassification;
    } catch (error) {
      this.logger.error('Error getting accrual schedule classifications from ODS %s %o', classificationTypeCode, error);

      throw new InternalServerErrorException(`Error getting accrual schedule classifications from ODS ${classificationTypeCode}`);
    }
  }
}
