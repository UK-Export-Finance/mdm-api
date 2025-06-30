import { GetOdsBusinessCentreMappedResponse, GetOdsBusinessCentreResponse } from '@ukef/modules/ods/dto';

/**
 * Map ODS business centres data into a nicer format.
 * @param {GetOdsBusinessCentreResponse[]} Business centres
 * @returns {GetOdsBusinessCentreMappedResponse[]}
 */
export const mapBusinessCentres = (businessCentres: GetOdsBusinessCentreResponse[]): GetOdsBusinessCentreMappedResponse[] =>
  businessCentres.map((centre: GetOdsBusinessCentreResponse) => ({
    code: centre.business_centre_code,
    name: centre.business_centre_name,
  }));
