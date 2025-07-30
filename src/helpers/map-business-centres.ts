import { DomBusinessCentre } from '@ukef/constants';

import { GetDomBusinessCentreResponse } from '../modules/dom/dto';
import { mapBusinessCentre } from './map-business-centre';

/**
 * Map DOM business centres data from constants, into a more suitable format for consumers.
 * @param {DomBusinessCentre[]} DOM Business centres
 * @returns {GetDomBusinessCentreResponse[]} Mapped business centres
 */
export const mapBusinessCentres = (centres: DomBusinessCentre[]): GetDomBusinessCentreResponse[] =>
  centres.map((centre: DomBusinessCentre) => mapBusinessCentre(centre));
