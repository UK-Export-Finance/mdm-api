import { GetDomBusinessCentreNonWorkingDayMappedResponse } from '@ukef/modules/dom/dto';
import { GetOdsBusinessCentreNonWorkingDayResponse } from '@ukef/modules/ods/dto';

/**
 * Map a business centre's non working days data into a simpler format.
 * @param {GetDomBusinessCentreNonWorkingDayResponse[]} Business centre - non working days
 * @param {String} Business centre code
 * @returns {GetDomBusinessCentreNonWorkingDayMappedResponse[]}
 */
export const mapBusinessCentreNonWorkingDays = (
  nonWorkingDays: GetOdsBusinessCentreNonWorkingDayResponse[],
  centreCode: string,
): GetDomBusinessCentreNonWorkingDayMappedResponse[] => {
  if (!centreCode) {
    return [];
  }

  return nonWorkingDays.map((nonWorkingDay: GetOdsBusinessCentreNonWorkingDayResponse) => ({
    code: centreCode,
    name: nonWorkingDay.non_working_day_name,
    date: nonWorkingDay.non_working_day_date,
  }));
};
