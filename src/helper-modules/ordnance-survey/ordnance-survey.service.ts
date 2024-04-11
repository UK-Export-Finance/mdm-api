import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KEY as ORDNANCE_SURVEY_CONFIG_KEY, OrdnanceSurveyConfig } from '@ukef/config/ordnance-survey.config';
import { GEOSPATIAL } from '@ukef/constants';
import { HttpClient } from '@ukef/modules/http/http.client';

import { GetAddressOrdnanceSurveyResponse } from './dto/get-addresses-ordnance-survey-response.dto';
// import { getCustomersNotFoundKnownOrdnanceSurveyError } from './known-errors';
import { createWrapOrdnanceSurveyHttpGetErrorCallback } from './wrap-ordnance-survey-http-error-callback';

@Injectable()
export class OrdnanceSurveyService {
  private readonly httpClient: HttpClient;
  private readonly key: string;

  constructor(httpService: HttpService, configService: ConfigService) {
    this.httpClient = new HttpClient(httpService);
    const { key } = configService.get<OrdnanceSurveyConfig>(ORDNANCE_SURVEY_CONFIG_KEY);
    this.key = key;
  }

  async getAddressesByPostcode(postcode): Promise<GetAddressOrdnanceSurveyResponse> {
    const path = `/search/places/v1/postcode?postcode=${encodeURIComponent(postcode)}&lr=${GEOSPATIAL.DEFAULT.RESULT_LANGUAGE}&key=${encodeURIComponent(this.key)}`;
    const { data } = await this.httpClient.get<GetAddressOrdnanceSurveyResponse>({
      path,
      headers: { 'Content-Type': 'application/json' },
      onError: createWrapOrdnanceSurveyHttpGetErrorCallback({
        messageForUnknownError: `Failed to get response from Ordnance Survey API.`,
        knownErrors: [],
        // knownErrors: [getCustomersNotFoundKnownOrdnanceSurveyError()], // TODO: should we change 200 no results to 404?
      }),
    });
    return data;
  }
}
