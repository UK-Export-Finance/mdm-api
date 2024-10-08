import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpClient } from '@ukef/modules/http/http.client';

import { createWrapSalesforceHttpGetErrorCallback } from './wrap-salesforce-http-error-callback';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import { CreateCustomerSalesforceResponseDto } from './dto/create-customer-salesforce-response.dto';
import { CompanyRegistrationNumberDto } from '../customers/dto/company-registration-number.dto';
import { GetCustomersDirectResponse, GetCustomersDirectResponseItems } from '../customers/dto/get-customers-direct-response.dto';

@Injectable()
export class SalesforceService {
  private readonly httpClient: HttpClient;

  constructor(httpService: HttpService) {
    this.httpClient = new HttpClient(httpService);
  }

  async getCustomers(companyRegistrationNumberDto: CompanyRegistrationNumberDto): Promise<GetCustomersDirectResponseItems> {
    const encodedCompanyRegistrationNumber = encodeURIComponent(companyRegistrationNumberDto.companyRegistrationNumber);
    const path = `/query/?q=SELECT+FIELDS(ALL)+FROM+Account+WHERE+Company_Registration_Number__c='${encodedCompanyRegistrationNumber}'+LIMIT+200`;
    const access_token = await this.getAccessToken();
    const { data } = await this.httpClient.get<GetCustomersDirectResponse>({
      path,
      headers: {
        'Authorization': 'Bearer ' + access_token,
      },
      onError: createWrapSalesforceHttpGetErrorCallback({
        messageForUnknownError: `Failed to get customers in Salesforce.`,
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
        messageForUnknownError: `Failed to create customer in Salesforce.`,
      }),
    });
    return data;
  }

  private async getAccessToken(): Promise<string> {
    const path = process.env.SF_ACCESS_URL
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
      onError: createWrapSalesforceHttpGetErrorCallback({
        messageForUnknownError: `Failed to get access token.`,
      }),
    })
    return response.data.access_token
  }
}
