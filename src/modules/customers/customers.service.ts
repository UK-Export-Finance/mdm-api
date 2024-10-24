import { Injectable } from '@nestjs/common';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';

import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { GetCustomersDirectResponse, GetCustomersDirectResponseItem } from './dto/get-customers-direct-response.dto';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { SalesforceException } from '../salesforce/exception/salesforce.exception';

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

  async getCustomersDirect(companyRegistrationNumberDto: CompanyRegistrationNumberDto): Promise<GetCustomersDirectResponse> {
    const customersInSalesforce = await this.salesforceService.getCustomers(companyRegistrationNumberDto);
    return customersInSalesforce.map(
      (customerInSalesforce): GetCustomersDirectResponseItem => ({
        partyUrn: customerInSalesforce.Party_URN__c,
        name: customerInSalesforce.Name,
        sfId: customerInSalesforce.Id,
        companyRegNo: customerInSalesforce.Company_Registration_Number__c
      })
    )
  }

  async createCustomer(DTFSCustomerDto: DTFSCustomerDto): Promise<GetCustomersDirectResponse> {
    // TODO: to get DUNS from DnB
    const dunsNumber: string = null
    const createCustomerDto: CreateCustomerDto = {
      "Name": DTFSCustomerDto.companyName,
      // TODO: change to dunsNumber
      "D_B_Number__c": DTFSCustomerDto.companyName,
      "Company_Registration_Number__c": DTFSCustomerDto.companyRegistrationNumber,
    }

    const createCustomerResponse: CreateCustomerSalesforceResponseDto = await this.salesforceService.createCustomer(createCustomerDto)

    if (createCustomerResponse.success) {
      const companyRegistrationNumberDto: CompanyRegistrationNumberDto = {
        "companyRegistrationNumber": DTFSCustomerDto.companyRegistrationNumber
      }
      return this.getCustomersDirect(companyRegistrationNumberDto)
    }
    else {
      throw new SalesforceException("Failed to create customer in Salesforce")
    }
  }
}
