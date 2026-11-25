import { GetFeeTypeOdsResponseDto, GetFeeTypeResponseDto } from '@ukef/modules/ods/dto';

import { mapFeeType } from './map-fee-type';

/**
 * Map ODS fee types, into a more suitable format for consumers.
 * @param {GetFeeTypeOdsResponseDto[]} ODS fee types
 * @returns {GetFeeTypeResponseDto[]} Mapped fee types
 */
export const mapFeeTypes = (feeTypes: GetFeeTypeOdsResponseDto[]): GetFeeTypeResponseDto[] => feeTypes.map(mapFeeType);
