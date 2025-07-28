import { ODS_TO_DOM_BUSINESS_CENTRES_MAPPING } from '@ukef/constants';
import { GetOdsBusinessCentreResponse } from '@ukef/modules/ods/dto';

import { GetDomBusinessCentreResponse } from '../modules/dom/dto';

/**
 * Map ODS business centres data, into DOM business centre codes.
 * Only return a business centre if a code and name has been mapped.
 * This is required until DOM is live and ready for consumption.
 * @param {GetOdsBusinessCentreResponse[]} ODS Business centres
 * @returns {GetDomBusinessCentreResponse[]} DOM Business centres
 */
export const mapBusinessCentres = (odsBusinessCentres: GetOdsBusinessCentreResponse[]): GetDomBusinessCentreResponse[] =>
  odsBusinessCentres
    .map((odsCentre: GetOdsBusinessCentreResponse) => ({
      code: ODS_TO_DOM_BUSINESS_CENTRES_MAPPING[`${odsCentre.business_centre_code}`]?.CODE,
      name: ODS_TO_DOM_BUSINESS_CENTRES_MAPPING[`${odsCentre.business_centre_code}`]?.NAME,
    }))
    .filter((odsCentre) => odsCentre.code && odsCentre.name);
