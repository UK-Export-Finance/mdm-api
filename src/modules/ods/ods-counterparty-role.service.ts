import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { STORED_PROCEDURE } from '@ukef/constants';
import { mapCounterpartyRoles } from '@ukef/helpers';
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
