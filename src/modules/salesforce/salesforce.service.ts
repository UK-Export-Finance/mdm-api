import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpClient } from '@ukef/modules/http/http.client';

import { KEY, SalesforceConfig } from '../../config/salesforce.config';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import { GetCustomersResponse } from '../customers/dto/get-customers-response.dto';
import { GetCustomersInformaticaQueryDto } from '../informatica/dto/get-customers-informatica-query.dto';
import { CreateCustomerSalesforceResponseDto } from './dto/create-customer-salesforce-response.dto';
import { customerAlreadyExistsSalesforceError } from './known-errors';
import { createWrapSalesforceHttpGetErrorCallback } from './wrap-salesforce-http-error-callback';

@Injectable()
export class SalesforceService {
  private readonly httpClient: HttpClient;
  private readonly client_id: string;
  private readonly client_secret: string;
  private readonly access_url: string;

  constructor(httpService: HttpService, configService: ConfigService) {
    const { clientId, clientSecret, accessUrl } = configService.get<SalesforceConfig>(KEY);
    this.client_id = clientId;
    this.client_secret = clientSecret;
    this.access_url = accessUrl;

    this.httpClient = new HttpClient(httpService);
  }

  async getCustomers(backendQuery: GetCustomersInformaticaQueryDto): Promise<GetCustomersResponse> {
    console.log('backendQuery', backendQuery);
    const path = '/sobjects/Account';
    const access_token = await this.getAccessToken();
    const { data } = await this.httpClient.get<any>({
      path,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
      onError: createWrapSalesforceHttpGetErrorCallback({
        messageForUnknownError: `Failed to get customer in Salesforce`,
        knownErrors: [],
      }),
    });

    return data;
  }

  async getCustomers2(backendQuery: GetCustomersInformaticaQueryDto): Promise<GetCustomersResponse> {
    console.log('backendQuery', backendQuery);

    const search = (backendQuery.partyUrn ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    // const soql = `SELECT Id, Name, Owner.id, Owner.Name, Account_Type__c, Account_Sub_Type__c,
    //   createdby.username, createdby.id, createdby.name,
    //   BillingStreet, BillingCity, BillingState, BillingCountry, BillingPostalcode,
    //   Company_Registered_Name__c, Company_Registration_Number__c, Registered_City__c, Registered_Country__c,
    //   Registered_County_State_Province__c, Region__c, Sub_region__c, Registered_Street__c, national_international__c,
    //   Party_URN__c, Parent.Name, Website,
    //   SME_Type__c, Sic, Turnover__c, CreatedDate
    //   FROM Account
    //   WHERE Party_URN__c = '${search}'
    //   LIMIT 100`;

    const soql = `SELECT *
      FROM Account
      WHERE Party_URN__c = '${search}'
      LIMIT 100`;

    return this.runSoql(soql);
  }

  async runSoql(soql: string): Promise<GetCustomersResponse> {
    console.log('soql', soql);

    const path = `/query?q=${encodeURIComponent(soql)}`;
    const access_token = await this.getAccessToken();
    const { data } = await this.httpClient.get<any>({
      path,
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
      onError: createWrapSalesforceHttpGetErrorCallback({
        messageForUnknownError: `Failed to get customer in Salesforce`,
        knownErrors: [],
      }),
    });

    return data;
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
    const { data } = await this.httpClient.post<CreateCustomerDto, CreateCustomerSalesforceResponseDto>({
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

    return data;
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
        grant_type: 'client_credentials',
        client_id: this.client_id,
        client_secret: this.client_secret,
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
