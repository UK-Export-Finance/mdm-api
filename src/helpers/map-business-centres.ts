import { DomBusinessCentre } from '@ukef/constants';

import { FindDomBusinessCentreResponse } from '../modules/dom/dto';
import { mapBusinessCentre } from './map-business-centre';

/**
 * Map DOM business centres data from constants, into a more suitable format for consumers.
 * @param {DomBusinessCentre[]} DOM Business centres
 * @returns {FindDomBusinessCentreResponse[]} Mapped business centres
 */
export const mapBusinessCentres = (centres: DomBusinessCentre[]): FindDomBusinessCentreResponse[] =>
  centres.map((centre: DomBusinessCentre) => mapBusinessCentre(centre));
