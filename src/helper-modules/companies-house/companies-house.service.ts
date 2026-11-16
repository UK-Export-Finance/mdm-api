import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { CompaniesHouseConfigType } from '@ukef/config/companies-house.config';
import { COMPANIES_HOUSE } from '@ukef/constants';
import { HttpClient } from '@ukef/modules/http/http.client';

import { GetCompanyCompaniesHouseResponse } from './dto/get-company-companies-house-response.dto';
import { CompaniesHouseNotFoundException } from './exception/companies-house-not-found.exception';
import {
  getCompanyInvalidAuthorizationKnownCompaniesHouseError,
  getCompanyMalformedAuthorizationHeaderKnownCompaniesHouseError,
  getCompanyNotFoundKnownCompaniesHouseError,
} from './known-errors';
import { createWrapCompaniesHouseHttpGetErrorCallback } from './wrap-companies-house-http-error-callback';

@Injectable()
export class CompaniesHouseService {
  private readonly httpClient: HttpClient;

  private readonly key: string;

  constructor(
    httpService: HttpService,
    configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.httpClient = new HttpClient(httpService);

    const { key } = configService.get<CompaniesHouseConfigType>(COMPANIES_HOUSE.CONFIG.KEY);

    this.key = key;
  }

  /**
   * Get company details from the Companies House API by registration number.
   * @param {string} registrationNumber - The registration number of the company to retrieve.
   * @returns {Promise<GetCompanyCompaniesHouseResponse>} The response from the Companies House API containing the company details.
   */
  async getCompanyByRegistrationNumber(registrationNumber: string): Promise<GetCompanyCompaniesHouseResponse> {
    const path = `/company/${registrationNumber}`;
    const encodedKey = Buffer.from(this.key).toString('base64');

    try {
      this.logger.info('Getting Companies House company %s', registrationNumber);

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
    } catch (error) {
      if (error instanceof CompaniesHouseNotFoundException) {
        this.logger.info('Companies House company %s not found %o', registrationNumber, error);
      } else {
        this.logger.error('Error getting Companies House company %s %o', registrationNumber, error);
      }

      throw error;
    }
  }
}
