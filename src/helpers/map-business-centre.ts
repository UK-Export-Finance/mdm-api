import { DomBusinessCentre } from '@ukef/constants';

import { FindDomBusinessCentreResponse } from '../modules/dom/dto';

/**
 * Map a DOM business centre data into a more suitable format for consumers.
 * @param {DomBusinessCentre} DOM Business centres
 * @returns {FindDomBusinessCentreResponse} Mapped business centre
 */
export const mapBusinessCentre = (centre: DomBusinessCentre): FindDomBusinessCentreResponse => ({
  code: centre.CODE,
  name: centre.NAME,
});
