import { DomBusinessCentre } from '@ukef/constants';

import { GetDomBusinessCentreResponse } from '../modules/dom/dto';

/**
 * Map a DOM business centre data into a more suitable format for consumers.
 * @param {DomBusinessCentre} DOM Business centres
 * @returns {GetDomBusinessCentreResponse} Mapped business centre
 */
export const mapBusinessCentre = (centre: DomBusinessCentre): GetDomBusinessCentreResponse => ({
  code: centre.CODE,
  name: centre.NAME,
});
