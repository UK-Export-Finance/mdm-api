import { OdsBusinessCentreOdsResponse } from '@ukef/modules/ods/dto/get-ods-business-centre-ods-response.dto';

import { FindOdsBusinessCentreOdsResponse } from '../modules/dom/dto';

/**
 * Map an ODS business centre data into a more suitable format for consumers.
 * @param {OdsBusinessCentreOdsResponse} ODS Business centres
 * @returns {FindOdsBusinessCentreOdsResponse} Mapped business centre
 */
export const mapBusinessCentre = (centre: OdsBusinessCentreOdsResponse): FindOdsBusinessCentreOdsResponse => ({
  code: centre.business_centre_code,
  name: centre.business_centre_name,
  description: centre.business_centre_type_description,
  isActive: centre.business_centre_active_flag,
});
