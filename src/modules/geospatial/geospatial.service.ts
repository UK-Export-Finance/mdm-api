import { Injectable } from '@nestjs/common';
import { OrdnanceSurveyService } from '@ukef/helper-modules/ordnance-survey/ordnance-survey.service';

import { GetSearchAddressesResponse } from './dto/get-search-addresses-response.dto';

@Injectable()
export class GeospatialService {
  constructor(private readonly ordnanceSurveyService: OrdnanceSurveyService) {}

  async getAddressesByPostcode(postcode: string): Promise<GetSearchAddressesResponse> {
    const addresses = [];
    const response = await this.ordnanceSurveyService.getAddressesByPostcode(postcode);

    response.results.forEach((item) => {
      // if (item.DPA.LANGUAGE === (req.query.language ? req.query.language : 'EN')) {
      // Ordnance survey sends duplicated results with the welsh version too via 'CY'
      if (item.DPA.LANGUAGE === 'EN') {
        addresses.push({
          organisationName: item.DPA.ORGANISATION_NAME || null,
          addressLine1: `${item.DPA.BUILDING_NAME || ''} ${item.DPA.BUILDING_NUMBER || ''} ${item.DPA.THOROUGHFARE_NAME || ''}`.trim(),
          addressLine2: item.DPA.DEPENDENT_LOCALITY || null,
          addressLine3: null, // keys to match registered Address as requested, but not available in OS Places
          locality: item.DPA.POST_TOWN || null,
          postalCode: item.DPA.POSTCODE || null,
          country: null, // keys to match registered Address as requested, but not available in OS Places
        });
      }
    });

    return addresses;
  }
}
