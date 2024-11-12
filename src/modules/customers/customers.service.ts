import { Injectable } from '@nestjs/common';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';

import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { GetCustomersSalesforceResponse, GetCustomersSalesforceResponseItem } from './dto/get-customers-salesforce-response.dto';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';

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

  async getCustomersSalesforce(companyRegistrationNumberDto: CompanyRegistrationNumberDto): Promise<GetCustomersSalesforceResponse> {
    const customersInSalesforce = await this.salesforceService.getCustomers(companyRegistrationNumberDto);
    return customersInSalesforce.map(
      (customerInSalesforce): GetCustomersSalesforceResponseItem => ({
        partyUrn: customerInSalesforce.Party_URN__c,
        name: customerInSalesforce.Name,
        sfId: customerInSalesforce.Id,
        companyRegNo: customerInSalesforce.Company_Registration_Number__c
      })
    )
  }
}
