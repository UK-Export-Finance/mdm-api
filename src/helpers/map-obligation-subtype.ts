import { GetObligationSubtypeOdsResponseDto, GetObligationSubtypeResponseDto } from '@ukef/modules/ods/dto';

/**
 * Maps the ODS obligation subtype response DTO to the API obligation subtype response DTO.
 * @param subType Obligation subtype response DTO from ODS
 * @returns Data from the ODS subtype mapped into API format
 */
export const mapObligationSubtype = (subType: GetObligationSubtypeOdsResponseDto): GetObligationSubtypeResponseDto => {
  return {
    code: subType.code,
    description: subType.name,
    balanceCategory: subType.balanceCategory,
    isActive: subType.obligationSubtypeActive,
  };
};
