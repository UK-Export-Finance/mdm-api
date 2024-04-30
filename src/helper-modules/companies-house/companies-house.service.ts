import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CompaniesHouseConfig, KEY as COMPANIES_HOUSE_CONFIG_KEY } from '@ukef/config/companies-house.config';
import { HttpClient } from '@ukef/modules/http/http.client';

import { GetCompanyCompaniesHouseResponse } from './dto/get-company-companies-house-response.dto';
import { CompaniesHouseNotFoundException } from './exception/companies-house-not-found.exception';

@Injectable()
export class CompaniesHouseService {
  private readonly httpClient: HttpClient;
  private readonly key: string;

  constructor(httpService: HttpService, configService: ConfigService) {
    this.httpClient = new HttpClient(httpService);
    const { key } = configService.get<CompaniesHouseConfig>(COMPANIES_HOUSE_CONFIG_KEY);
    this.key = key;
  }

  async getCompanyByRegistrationNumber(registrationNumber: string): Promise<GetCompanyCompaniesHouseResponse> {
    const path = `/company/${registrationNumber}`;
    const encodedKey = Buffer.from(this.key).toString('base64');

    const { status, data } = await this.httpClient.get<GetCompanyCompaniesHouseResponse>({
      path,
      headers: {
        Authorization: `Basic ${encodedKey}`,
        'Content-Type': 'application/json',
      },
      onError: (error: Error) => {
        throw error;
      },
    });

    if (status === 404) {
      throw new CompaniesHouseNotFoundException(`Company with registration number ${registrationNumber} was not found.`)
    }

    return data;
  }
}
