import { FindOdsBusinessCentreOdsResponseNonWorkingDayMappedResponse } from '@ukef/modules/dom/dto';
import { GetOdsBusinessCentreOdsResponseNonWorkingDayResponse } from '@ukef/modules/ods/dto';

/**
 * Map a business centre's non working days data into a simpler format.
 * @param {GetOdsBusinessCentreOdsResponseNonWorkingDayResponse[]} nonWorkingDays: Business centre - non working days
 * @param {string} centreCode: Business centre code
 * @returns {FindOdsBusinessCentreOdsResponseNonWorkingDayMappedResponse[]}
 */
export const mapBusinessCentreNonWorkingDays = (
  nonWorkingDays: GetOdsBusinessCentreOdsResponseNonWorkingDayResponse[],
  centreCode: string,
): FindOdsBusinessCentreOdsResponseNonWorkingDayMappedResponse[] => {
  if (!centreCode) {
    return [];
  }

  return nonWorkingDays.map((nonWorkingDay: GetOdsBusinessCentreOdsResponseNonWorkingDayResponse) => ({
    code: centreCode,
    name: nonWorkingDay.non_working_day_name,
    date: nonWorkingDay.non_working_day_date,
  }));
};
