import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapCounterpartyRole, mapCounterpartyRoles } from '@ukef/helpers';
import { PinoLogger } from 'nestjs-pino';

import { GetCounterpartyRoleOdsResponseDto, GetCounterpartyRoleResponseDto, ODS_ENTITIES, OdsStoredProcedureOutputBody } from './dto';
import { OdsStoredProcedureService } from './ods-stored-procedure.service';

@Injectable()
export class OdsCounterpartyRoleService {
  constructor(
    private readonly odsStoredProcedureService: OdsStoredProcedureService,
    private readonly logger: PinoLogger,
  ) {}

  /**
   * Find a counterparty role by role type
   * @param {string} roleType: Role type
   * @returns {Promise<GetObligationSubtypeResponseDto>}
   * @throws {NotFoundException} If no counterparty role is found
   */
  async findOne(roleType: string): Promise<GetCounterpartyRoleResponseDto> {
    try {
      this.logger.info('Finding counterparty role in ODS %s', roleType);

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.CONFIGURATION_COUNTERPARTY_ROLE,
        queryPageSize: 1,
        queryParameters: {
          counterpartyRoleType: roleType,
        },
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error finding counterparty role %s from ODS stored procedure, output %o', roleType, storedProcedureResult);

        throw new Error(`Error finding counterparty role ${roleType} from ODS stored procedure`);
      }

      if (storedProcedureJson?.total_result_count === 0) {
        throw new NotFoundException(`No counterparty role ${roleType} found in ODS`);
      }

      const subType = storedProcedureJson.results[0] as GetCounterpartyRoleOdsResponseDto;

      return mapCounterpartyRole(subType);
    } catch (error) {
      this.logger.error('Error finding counterparty role in ODS %s %o', roleType, error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(`Error finding counterparty role ${roleType} in ODS`, { cause: error });
    }
  }

  /**
   * Get all counterparty roles from ODS
   * @returns {Promise<GetCounterpartyRoleResponseDto[]>} Counterparty roles
   * @throws {InternalServerErrorException} If there is an error getting counterparty roles from ODS
   */
  async getAll(): Promise<GetCounterpartyRoleResponseDto[]> {
    try {
      this.logger.info('Getting counterparty roles from ODS');

      const storedProcedureInput = this.odsStoredProcedureService.createInput({
        entityToQuery: ODS_ENTITIES.CONFIGURATION_COUNTERPARTY_ROLE,
      });

      const storedProcedureResult = await this.odsStoredProcedureService.call(storedProcedureInput);

      const storedProcedureJson: OdsStoredProcedureOutputBody = JSON.parse(storedProcedureResult);

      if (storedProcedureJson?.status !== STORED_PROCEDURE.SUCCESS) {
        this.logger.error('Error getting counterparty roles from ODS stored procedure, output %o', storedProcedureResult);

        throw new InternalServerErrorException('Error getting counterparty roles from ODS stored procedure');
      }

      const roles = storedProcedureJson.results as GetCounterpartyRoleOdsResponseDto[];

      const mappedRoles = mapCounterpartyRoles(roles);

      return mappedRoles;
    } catch (error) {
      this.logger.error('Error getting counterparty roles from ODS %o', error);

      throw new InternalServerErrorException('Error getting counterparty roles from ODS');
    }
  }
}
