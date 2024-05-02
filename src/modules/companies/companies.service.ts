import { Injectable } from '@nestjs/common';
import { CompaniesHouseService } from '@ukef/helper-modules/companies-house/companies-house.service';
import { GetCompanyCompaniesHouseResponse } from '@ukef/helper-modules/companies-house/dto/get-company-companies-house-response.dto';

import { GetCompanyResponse } from './dto/get-company-response.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly companiesHouseService: CompaniesHouseService) {}

  async getCompanyByRegistrationNumber(registrationNumber: string): Promise<GetCompanyResponse> {
    const company: GetCompanyCompaniesHouseResponse = await this.companiesHouseService.getCompanyByRegistrationNumber(registrationNumber);

    const reducedCompany = this.reduceCompany(company);

    return reducedCompany;
  }

  private reduceCompany(company: GetCompanyCompaniesHouseResponse): GetCompanyResponse {
    const address = company.registered_office_address;

    return {
      companiesHouseRegistrationNumber: company.company_number,
      companyName: company.company_name,
      registeredAddress: {
        organisationName: address.organisation_name,
        addressLine1: address.address_line_1,
        addressLine2: address.address_line_2,
        addressLine3: address.address_line_3,
        locality: address.locality,
        postalCode: address.postal_code,
        country: address.country,
      },
      sicCodes: company.sic_codes,
    };
  }
}
