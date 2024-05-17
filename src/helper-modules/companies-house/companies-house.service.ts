import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompaniesHouseConfig } from '@ukef/config/companies-house.config';
import { HttpClient } from '@ukef/modules/http/http.client';

import { GetCompanyCompaniesHouseResponse } from './dto/get-company-companies-house-response.dto';
import {
  getCompanyInvalidAuthorizationKnownCompaniesHouseError,
  getCompanyMalformedAuthorizationHeaderKnownCompaniesHouseError,
  getCompanyNotFoundKnownCompaniesHouseError,
} from './known-errors';
import { createWrapCompaniesHouseHttpGetErrorCallback } from './wrap-companies-house-http-error-callback';
import { COMPANIES_HOUSE } from '@ukef/constants';

@Injectable()
export class CompaniesHouseService {
  private readonly httpClient: HttpClient;
  private readonly key: string;

  constructor(httpService: HttpService, configService: ConfigService) {
    this.httpClient = new HttpClient(httpService);
    const { key } = configService.get<CompaniesHouseConfig>(COMPANIES_HOUSE.CONFIG.KEY);
    this.key = key;
  }

  async getCompanyByRegistrationNumber(registrationNumber: string): Promise<GetCompanyCompaniesHouseResponse> {
    const path = `/company/${registrationNumber}`;
    const encodedKey = Buffer.from(this.key).toString('base64');

    const { data } = await this.httpClient.get<GetCompanyCompaniesHouseResponse>({
      path,
      headers: {
        Authorization: `Basic ${encodedKey}`,
      },
      onError: createWrapCompaniesHouseHttpGetErrorCallback({
        messageForUnknownError: 'Failed to get response from Companies House API.',
        knownErrors: [
          getCompanyMalformedAuthorizationHeaderKnownCompaniesHouseError(),
          getCompanyInvalidAuthorizationKnownCompaniesHouseError(),
          getCompanyNotFoundKnownCompaniesHouseError(registrationNumber),
        ],
      }),
    });

    return data;
  }
}
