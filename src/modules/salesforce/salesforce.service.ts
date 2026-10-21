import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { HttpClient } from '@ukef/modules/http/http.client';

import { SALESFORCE_CONFIG_KEY, SalesforceConfigType } from '@ukef/config/salesforce.config';
import { CreateCustomerDto } from '@ukef/modules/customers/dto/create-customer.dto';
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

  constructor(
    httpService: HttpService,
    configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    const { clientId, clientSecret, username, password, accessUrl } = configService.get<SalesforceConfigType>(SALESFORCE_CONFIG_KEY);
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
    const accessToken = await this.getAccessToken();

    try {
      this.logger.info('Sending customer creation request to Salesforce %s for company %s', path, createCustomerDto.Company_Registration_Number__c);

      const { data } = await this.httpClient.post<CreateCustomerDto, CreateCustomerSalesforceResponseDto>({
        path,
        body: createCustomerDto,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        onError: createWrapSalesforceHttpGetErrorCallback({
          messageForUnknownError: `Failed to create customer in Salesforce`,
          knownErrors: [customerAlreadyExistsSalesforceError()],
        }),
      });

      if (data?.success) {
        this.logger.info('Salesforce confirmed customer creation for company %s', createCustomerDto.Company_Registration_Number__c);
      } else {
        this.logger.warn('Salesforce did not confirm customer creation for company %s', createCustomerDto.Company_Registration_Number__c);
      }

      return data;
    } catch (error) {
      this.logger.error('Salesforce customer creation request failed for company %s', createCustomerDto.Company_Registration_Number__c);

      throw error;
    }
  }

  /**
   * Retrieves an access token from Salesforce for API authentication.
   *
   * @returns {Promise<string>} A promise that resolves to the access token as a string.
   *
   * @throws Will throw an error if the Salesforce API fails to provide an access token.
   */
  private async getAccessToken(): Promise<string> {
    try {
      this.logger.info('Requesting Salesforce access token');

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

      if (response.data.access_token) {
        this.logger.info('Received Salesforce access token');
      } else {
        this.logger.warn('Salesforce authentication response did not include an access token');
      }

      return response.data.access_token;
    } catch (error) {
      this.logger.error('Failed to retrieve Salesforce access token');

      throw error;
    }
  }
}
