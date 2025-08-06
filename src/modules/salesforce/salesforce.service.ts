import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClient } from '@ukef/modules/http/http.client';

import { KEY, SalesforceConfig } from '../../config/salesforce.config';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import { CreateCustomerSalesforceResponseDto } from './dto/create-customer-salesforce-response.dto';
import { customerAlreadyExistsSalesforceError } from './known-errors';
import { createWrapSalesforceHttpGetErrorCallback } from './wrap-salesforce-http-error-callback';

@Injectable()
export class SalesforceService {
  private readonly httpClient: HttpClient;
  private readonly client_id: string;
  private readonly client_secret: string;
  private readonly username: string;
  private readonly password: string;
  private readonly access_url: string;

  constructor(httpService: HttpService, configService: ConfigService) {
    const { clientId, clientSecret, username, password, accessUrl } = configService.get<SalesforceConfig>(KEY);
    this.client_id = clientId;
    this.client_secret = clientSecret;
    this.username = username;
    this.password = password;
    this.access_url = accessUrl;

    this.httpClient = new HttpClient(httpService);
  }

  /**
   * Creates a new customer record in Salesforce.
   *
   * @param {CreateCustomerDto} createCustomerDto - The data transfer object containing customer information to be created in Salesforce.
   * @returns {Promise<CreateCustomerSalesforceResponseDto>} A promise that resolves to the response from Salesforce,
   * containing details of the created customer.
   *
   * @throws Will throw an error if the Salesforce API returns an error during the creation process.
   */
  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerSalesforceResponseDto> {
    const path = '/sobjects/Account';
    const access_token = await this.getAccessToken();
    const response = await this.httpClient.post<CreateCustomerDto, CreateCustomerSalesforceResponseDto>({
      path,
      body: createCustomerDto,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
      onError: createWrapSalesforceHttpGetErrorCallback({
        messageForUnknownError: `Failed to create customer in Salesforce`,
        knownErrors: [customerAlreadyExistsSalesforceError()],
      }),
    });

    return response.data;
  }

  /**
   * Retrieves an access token from Salesforce for API authentication.
   *
   * @returns {Promise<string>} A promise that resolves to the access token as a string.
   *
   * @throws Will throw an error if the Salesforce API fails to provide an access token.
   */
  private async getAccessToken(): Promise<string> {
    const path = this.access_url;
    const response = await this.httpClient.post<any, any>({
      path,
      body: {
        grant_type: 'password',
        client_id: this.client_id,
        client_secret: this.client_secret,
        username: this.username,
        password: this.password,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onError: createWrapSalesforceHttpGetErrorCallback({
        messageForUnknownError: 'Failed to get access token',
        knownErrors: [],
      }),
    });
    return response.data.access_token;
  }
}
