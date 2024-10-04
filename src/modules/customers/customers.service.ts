import { Injectable } from '@nestjs/common';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';

import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly informaticaService: InformaticaService,
    private readonly salesforceService: SalesforceService,
  ) { }

  async getCustomers(backendQuery: GetCustomersInformaticaQueryDto): Promise<GetCustomersResponse> {
    const customersInInformatica = await this.informaticaService.getCustomers(backendQuery);
    return customersInInformatica.map(
      (customerInInformatica): GetCustomersResponseItem => ({
        partyUrn: customerInInformatica.partyUrn,
        name: customerInInformatica.name,
        sfId: customerInInformatica.sfId,
        companyRegNo: customerInInformatica.companyRegNo,
        type: customerInInformatica.type,
        subtype: customerInInformatica.subtype,
        isLegacyRecord: customerInInformatica.isLegacyRecord,
      }),
    );
  }

  async createCustomer(companyRegistrationNumberDto: CompanyRegistrationNumberDto): Promise<CreateCustomerSalesforceResponseDto> {
    // TODO: to get from DnB
    const dnbLookupResponse: CreateCustomerDto = {
      "Name": companyRegistrationNumberDto.companyRegistrationNumber,
      "BillingCountry": null,
      "BillingStreet": null,
      "BillingCity": null,
      "BillingPostalCode": null,
      "D_B_Number__c": companyRegistrationNumberDto.companyRegistrationNumber,
      "Company_Registration_Number__c": companyRegistrationNumberDto.companyRegistrationNumber,
    }
    // and request party urn?
    const customerResponse: CreateCustomerSalesforceResponseDto = await this.salesforceService.createCustomer(dnbLookupResponse)
    return customerResponse
  }
}
