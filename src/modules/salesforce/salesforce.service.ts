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
    const path = 'https://httpbin.org/post'
    const { data } = await this.httpClient.post<CreateCustomerDto, any>({
      path,
      body: query,
      headers: { 'Content-Type': 'application/json' },
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
}
