import { GetOdsBusinessCentreNonWorkingDayMappedResponse, GetOdsBusinessCentreNonWorkingDayResponse } from '@ukef/modules/ods/dto';

/**
 * Map a business centre's non working days data into a simpler format.
 * @param {GetOdsBusinessCentreNonWorkingDayResponse[]} Business centre - non working days
 * @returns {GetOdsBusinessCentreNonWorkingDayMappedResponse[]}
 */
export const mapBusinessCentreNonWorkingDays = (
  nonWorkingDays: GetOdsBusinessCentreNonWorkingDayResponse[],
): GetOdsBusinessCentreNonWorkingDayMappedResponse[] =>
  nonWorkingDays.map((nonWorkingDay: GetOdsBusinessCentreNonWorkingDayResponse) => ({
    code: nonWorkingDay.business_centre_code,
    name: nonWorkingDay.non_working_day_name,
    date: nonWorkingDay.non_working_day_date,
  }));
