import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpClient } from '@ukef/modules/http/http.client';

import { getCustomersNotFoundKnownInformaticaError } from '../informatica/known-errors';
import { createWrapInformaticaHttpGetErrorCallback } from '../informatica/wrap-informatica-http-error-callback';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import { CreateCustomerSalesforceResponseDto } from './dto/create-customer-salesforce-response.dto';

@Injectable()
export class SalesforceService {
  private readonly httpClient: HttpClient;

  constructor(httpService: HttpService) {
    this.httpClient = new HttpClient(httpService);
  }

  async createCustomer(query: CreateCustomerDto): Promise<CreateCustomerSalesforceResponseDto> {
    const path = '/sobjects/Account'
    const access_token = await this.getAccessToken();
    const { data } = await this.httpClient.post<CreateCustomerDto, CreateCustomerSalesforceResponseDto>({
      path,
      body: query,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
      // todo: fix error type
      onError: createWrapInformaticaHttpGetErrorCallback({
        messageForUnknownError: `Failed to create customer in Salesforce.`,
        knownErrors: [getCustomersNotFoundKnownInformaticaError()],
      }),
    });
    return data;
  }

  private async getAccessToken(): Promise<string> {
    const path = 'https://test.salesforce.com/services/oauth2/token'
    const response = await this.httpClient.post<any, any>({
      path,
      body: {
        'grant_type': 'password',
        'client_id': process.env.SF_CLIENT_ID,
        'client_secret': process.env.SF_CLIENT_SECRET,
        'username': process.env.SF_USERNAME,
        'password': process.env.SF_PASSWORD,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onError: createWrapInformaticaHttpGetErrorCallback({
        messageForUnknownError: `Failed to get access token.`,
        knownErrors: [getCustomersNotFoundKnownInformaticaError()],
      }),
    })
    return response.data.access_token
  }
}
