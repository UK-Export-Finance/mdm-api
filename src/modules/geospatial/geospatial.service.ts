import { Injectable } from '@nestjs/common';
import { ENUMS } from '@ukef/constants';
import { GetAddressOrdnanceSurveyResponse } from '@ukef/helper-modules/ordnance-survey/dto/get-addresses-ordnance-survey-response.dto';
import { OrdnanceSurveyService } from '@ukef/helper-modules/ordnance-survey/ordnance-survey.service';

import { GetAddressesResponse } from './dto/get-addresses-response.dto';

@Injectable()
export class GeospatialService {
  constructor(private readonly ordnanceSurveyService: OrdnanceSurveyService) {}

  async getAddressesByPostcode(postcode: string): Promise<GetAddressesResponse> {
    const addresses = [];
    const response: GetAddressOrdnanceSurveyResponse = await this.ordnanceSurveyService.getAddressesByPostcode(postcode);

    if (!response?.results) {
      return [];
    }

    response.results.forEach((item) => {
      // Ordnance survey sends duplicated results with the welsh version too via 'CY'
      const item_data = item[Object.keys(item)[0]];
      addresses.push({
        organisationName: item_data.ORGANISATION_NAME || null,
        addressLine1: `${item_data.BUILDING_NAME || ''} ${item_data.BUILDING_NUMBER || ''} ${item_data.THOROUGHFARE_NAME || ''}`.trim(),
        addressLine2: item_data.DEPENDENT_LOCALITY || null,
        addressLine3: null,
        locality: item_data.POST_TOWN || null,
        postalCode: item_data.POSTCODE || null,
        country: ENUMS.GEOSPATIAL_COUNTRIES[item_data.COUNTRY_CODE] || null,
      });
    });

    return addresses;
  }
}
