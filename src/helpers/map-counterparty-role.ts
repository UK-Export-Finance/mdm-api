import { GetCounterpartyRoleOdsResponseDto, GetCounterpartyRoleResponseDto } from '@ukef/modules/ods/dto';

/**
 * Map an ODS counterparty role, into a more suitable format for consumers.
 * @param {GetCounterpartyRoleResponseOdsDto} ODS counterparty role
 * @returns {GetCounterpartyRoleResponseDto} Mapped counterparty role
 */
export const mapCounterpartyRole = (counterpartyRole: GetCounterpartyRoleOdsResponseDto): GetCounterpartyRoleResponseDto => ({
  ...counterpartyRole,
  isActive: counterpartyRole.counterpartyRoleTypeActive,
});
