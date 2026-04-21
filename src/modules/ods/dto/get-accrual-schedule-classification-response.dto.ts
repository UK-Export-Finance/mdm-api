import { GetAdditionalRateResponseDto } from './get-additional-rate-response.dto';
import { GetBaseRateResponseDto } from './get-base-rate-response.dto';

export type GetAccrualScheduleClassificationResponseDto = GetBaseRateResponseDto | GetAdditionalRateResponseDto;
