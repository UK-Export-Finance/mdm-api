import { OdsBusinessCentreOdsResponse } from '@ukef/modules/ods/dto/get-ods-business-centre-ods-response.dto';

import { FindOdsBusinessCentreOdsResponse } from '../modules/dom/dto';
import { mapBusinessCentre } from './map-business-centre';

/**
 * Map ODS business centres data from constants, into a more suitable format for consumers.
 * @param {OdsBusinessCentreOdsResponse[]} ODS Business centres
 * @returns {FindOdsBusinessCentreOdsResponse[]} Mapped business centres
 */
export const mapBusinessCentres = (centres: OdsBusinessCentreOdsResponse[]): FindOdsBusinessCentreOdsResponse[] => centres.map(mapBusinessCentre);
