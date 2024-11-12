import { Injectable } from '@nestjs/common';
import { SalesforceService } from '@ukef/modules/salesforce/salesforce.service';

import { GetCustomersSalesforceResponse, GetCustomersSalesforceResponseItem } from './dto/get-customers-salesforce-response.dto';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly salesforceService: SalesforceService,
  ) { }

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
