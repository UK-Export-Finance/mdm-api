import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { HttpClient } from '@ukef/modules/http/http.client';
import { ConfigService } from '@nestjs/config';

import { createWrapSalesforceHttpGetErrorCallback } from './wrap-salesforce-http-error-callback';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import { CreateCustomerSalesforceResponseDto } from './dto/create-customer-salesforce-response.dto';
import { CompanyRegistrationNumberDto } from '../customers/dto/company-registration-number.dto';
import { GetCustomersSalesforceResponse, GetCustomersSalesforceResponseItems } from '../salesforce/dto/get-customers-salesforce-response.dto';
import { SalesforceConfig, KEY } from '../../config/salesforce.config';
import { customerAlreadyExistsSalesforceError } from './known-errors';

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

  async getCustomers(companyRegistrationNumberDto: CompanyRegistrationNumberDto): Promise<GetCustomersSalesforceResponseItems> {
    const isValid = /^[a-zA-Z0-9]{1,8}$/.test(companyRegistrationNumberDto.companyRegistrationNumber)
    if (!isValid) {
      throw new BadRequestException('Invalid Company Registration Number');
    }

    const encodedCompanyRegistrationNumber = encodeURIComponent(companyRegistrationNumberDto.companyRegistrationNumber);
    const path = `/query/?q=SELECT+FIELDS(ALL)+FROM+Account+WHERE+Company_Registration_Number__c='${encodedCompanyRegistrationNumber}'+LIMIT+200`;

    const access_token = await this.getAccessToken();
    const { data } = await this.httpClient.get<GetCustomersSalesforceResponse>({
      path,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
      onError: createWrapSalesforceHttpGetErrorCallback({
        messageForUnknownError: `Failed to get customers in Salesforce`,
        knownErrors: [],
      }),
    });
    if (data.totalSize === 0) {
      throw new NotFoundException('Customer not found');
    } else {
      return data.records;
    }
  }

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<CreateCustomerSalesforceResponseDto> {
    const path = '/sobjects/Account'
    const access_token = await this.getAccessToken();
    const { data } = await this.httpClient.post<CreateCustomerDto, CreateCustomerSalesforceResponseDto>({
      path,
      body: createCustomerDto,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
      onError: createWrapSalesforceHttpGetErrorCallback({
        messageForUnknownError: `Failed to create customer in Salesforce`,
        knownErrors: [customerAlreadyExistsSalesforceError()],
      }),
    });
    return data;
  }

  private async getAccessToken(): Promise<string> {
    const path = this.access_url
    const response = await this.httpClient.post<any, any>({
      path,
      body: {
        'grant_type': 'password',
        'client_id': this.client_id,
        'client_secret': this.client_secret,
        'username': this.username,
        'password': this.password,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onError: createWrapSalesforceHttpGetErrorCallback({
        messageForUnknownError: `Failed to get access token`,
        knownErrors: [],
      }),
    })
    return response.data.access_token
  }
}
