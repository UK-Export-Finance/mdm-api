import { GetCounterpartyRoleOdsResponseDto, GetCounterpartyRoleResponseDto } from '@ukef/modules/ods/dto';

import { mapCounterpartyRole } from './map-counterparty-role';

/**
 * Map an ODS counterparty roles, into a more suitable format for consumers.
 * @param {GetCounterpartyRoleOdsResponseDto[]} ODS counterparty roles
 * @returns {GetCounterpartyRoleResponseDto[]} Mapped counterparty roles
 */
export const mapCounterpartyRoles = (counterpartyRoles: GetCounterpartyRoleOdsResponseDto[]): GetCounterpartyRoleResponseDto[] =>
  counterpartyRoles.map(mapCounterpartyRole);
