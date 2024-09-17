import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpClient } from '@ukef/modules/http/http.client';

import { getCustomersNotFoundKnownInformaticaError } from '../informatica/known-errors';
import { createWrapInformaticaHttpGetErrorCallback } from '../informatica/wrap-informatica-http-error-callback';
import { GetCustomersResponseItem } from '../customers/dto/get-customers-response.dto';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';

@Injectable()
export class SalesforceService {
  private readonly httpClient: HttpClient;

  constructor(httpService: HttpService) {
    this.httpClient = new HttpClient(httpService);
  }

  async createCustomer(query: CreateCustomerDto): Promise<GetCustomersResponseItem> {
    const path = 'https://ukexportfinance--ccmapi.sandbox.my.salesforce.com/services/data/v53.0/sobjects/Account'
    const access_token = await this.getAccessToken();
    // todo: fix response type
    const { data } = await this.httpClient.post<CreateCustomerDto, any>({
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
    const testResponse: GetCustomersResponseItem = {
      partyUrn: 'partyurn',
      name: data,
      sfId: 'id',
      companyRegNo: 'regno',
      type: 'type',
      subtype: 'subtype',
      isLegacyRecord: false,
    }
    return testResponse;
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
