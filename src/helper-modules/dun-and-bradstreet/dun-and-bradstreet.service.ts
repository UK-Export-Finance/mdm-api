import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DUN_AND_BRADSTREET } from '@ukef/constants';
import { HttpClient } from '@ukef/modules/http/http.client';

import { DunAndBradstreetConfig } from '@ukef/config/dun-and-bradstreet.config';
import { createWrapDunAndBradstreetHttpGetErrorCallback } from './wrap-dun-and-bradstreet-http-error-callback';

@Injectable()
export class DunAndBradstreetService {
  private readonly httpClient: HttpClient;
  private readonly encoded_key: string;


  constructor(httpService: HttpService, configService: ConfigService) {
    this.httpClient = new HttpClient(httpService);
    const { key } = configService.get<DunAndBradstreetConfig>(DUN_AND_BRADSTREET.CONFIG.KEY);
    this.encoded_key = key;
  }

  async getDunAndBradstreetNumberByRegistrationNumber(registrationNumber: string): Promise<string> {
    const path = `/v1/match/cleanseMatch?countryISOAlpha2Code=GB&registrationNumber=${registrationNumber}`;
    const access_token = await this.getAccessToken();    
    const { data } = await this.httpClient.get<any>({
      path,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
      onError: createWrapDunAndBradstreetHttpGetErrorCallback({
        messageForUnknownError: 'Failed to get response from Dun and Bradstreet API',
        knownErrors: [],
      }),
    });
    return data?.matchCandidates[0]?.organization?.duns;
  }

  private async getAccessToken(): Promise<string> {
    const path = '/v3/token'
    const response = await this.httpClient.post<any, any>({
      path,
      body: {
        'grant_type': 'client_credentials',
      },
      headers: {
        'Authorization': 'Basic ' + this.encoded_key,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onError: createWrapDunAndBradstreetHttpGetErrorCallback({
        messageForUnknownError: 'Failed to get access token',
        knownErrors: [],
      }),
    })
    return response.data.access_token
  }
}
