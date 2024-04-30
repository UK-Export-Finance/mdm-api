import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompaniesHouseConfig, KEY as COMPANIES_HOUSE_CONFIG_KEY } from '@ukef/config/companies-house.config';
import { HttpClient } from '@ukef/modules/http/http.client';

import { GetCompanyCompaniesHouseResponse } from './dto/get-company-companies-house-response.dto';
// eslint-disable-line unused-imports/no-unused-vars

@Injectable()
export class CompaniesHouseService {
  private readonly httpClient: HttpClient;
  private readonly key: string;

  constructor(httpService: HttpService, configService: ConfigService) {
    this.httpClient = new HttpClient(httpService);
    const { key } = configService.get<CompaniesHouseConfig>(COMPANIES_HOUSE_CONFIG_KEY);
    this.key = key;
  }

  // eslint-disable-next-line unused-imports/no-unused-vars, require-await
  async getCompanyByRegistrationNumber(registrationNumber: string): Promise<GetCompanyCompaniesHouseResponse> {
    // make call to Companies House API
    return null;
  }
}
