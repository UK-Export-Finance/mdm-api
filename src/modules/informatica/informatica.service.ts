import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpClient } from '@ukef/modules/http/http.client';

import { GetCustomersInformaticaQueryDto } from './dto/get-customers-informatica-query.dto';
import { GetCustomersInformaticaResponse } from './dto/get-customers-informatica-response.dto';
import { getCustomersNotFoundKnownInformaticaError } from './known-errors';
import { createWrapInformaticaHttpGetErrorCallback } from './wrap-informatica-http-error-callback';

@Injectable()
export class InformaticaService {
  private readonly httpClient: HttpClient;

  constructor(httpService: HttpService) {
    this.httpClient = new HttpClient(httpService);
  }

  async getCustomers(query: GetCustomersInformaticaQueryDto): Promise<GetCustomersInformaticaResponse> {
    const path = '/account?' + new URLSearchParams(query as URLSearchParams).toString();

    const { data } = await this.httpClient.get<GetCustomersInformaticaResponse>({
      path,
      headers: { 'Content-Type': 'application/json' },
      onError: createWrapInformaticaHttpGetErrorCallback({
        messageForUnknownError: `Failed to get customers in Informatica.`,
        knownErrors: [getCustomersNotFoundKnownInformaticaError()],
      }),
    });

    return data;
  }
}
