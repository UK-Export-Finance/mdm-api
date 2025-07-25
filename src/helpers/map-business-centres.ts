import { DOM_BUSINESS_CENTRES } from '@ukef/constants';
import { GetOdsBusinessCentreResponse } from '@ukef/modules/ods/dto';

import { GetDomBusinessCentreMappedResponse } from '../modules/dom/dto';

/**
 * Map ODS business centres data, into DOM business centre codes.
 * Only return a business centre if a code and name has been mapped.
 * This is required until DOM is live and ready for consumption.
 * @param {GetOdsBusinessCentreResponse[]} ODS Business centres
 * @returns {GetDomBusinessCentreMappedResponse[]} DOM Business centres
 */
export const mapBusinessCentres = (odsBusinessCentres: GetOdsBusinessCentreResponse[]): GetDomBusinessCentreMappedResponse[] =>
  odsBusinessCentres
    .map((odsCentre: GetOdsBusinessCentreResponse) => ({
      code: DOM_BUSINESS_CENTRES[`${odsCentre.business_centre_code}`]?.CODE,
      name: DOM_BUSINESS_CENTRES[`${odsCentre.business_centre_code}`]?.NAME,
    }))
    .filter((odsCentre) => odsCentre.code && odsCentre.name);
