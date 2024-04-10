import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpClient } from '@ukef/modules/http/http.client';

import { GetAddressResponse } from './dto/get-addresses-response.dto';
// import { getCustomersNotFoundKnownOrdnanceSurveyError } from './known-errors';
import { createWrapOrdnanceSurveyHttpGetErrorCallback } from './wrap-ordnance-survey-http-error-callback';
import { ConfigService } from '@nestjs/config';
import { OrdnanceSurveyConfig, KEY as ORDNANCE_SURVEY_CONFIG_KEY } from '@ukef/config/ordnance-survey.config';

@Injectable()
export class OrdnanceSurveyService {
  private readonly httpClient: HttpClient;
  private readonly key: string;

  constructor(httpService: HttpService, configService: ConfigService) {
    this.httpClient = new HttpClient(httpService);
    const { key } = configService.get<OrdnanceSurveyConfig>(ORDNANCE_SURVEY_CONFIG_KEY);
    this.key = key;
  }

  async getAddressesByPostcode(postcode): Promise<GetAddressResponse> {
    const path = '/search/places/v1/postcode?postcode=' + postcode + '&key=' + this.key;
    const { data } = await this.httpClient.get<GetAddressResponse>({
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
