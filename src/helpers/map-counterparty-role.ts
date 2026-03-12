import { GetCounterpartyRoleOdsResponseDto, GetCounterpartyRoleResponseDto } from '@ukef/modules/ods/dto';

/**
 * Map an ODS counterparty role, into a more suitable format for consumers.
 * @param {GetCounterpartyRoleOdsResponseDto} ODS counterparty role
 * @returns {GetCounterpartyRoleResponseDto} Mapped counterparty role
 */
export const mapCounterpartyRole = (counterpartyRole: GetCounterpartyRoleOdsResponseDto): GetCounterpartyRoleResponseDto => {
  const { counterpartyRoleType, counterpartyRoleTypeActive, ...rest } = counterpartyRole;

  return {
    ...rest,
    roleType: counterpartyRoleType,
    isActive: counterpartyRoleTypeActive,
  };
};
