import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CompaniesHouseService } from '@ukef/helper-modules/companies-house/companies-house.service';
import { GetCompanyCompaniesHouseResponse } from '@ukef/helper-modules/companies-house/dto/get-company-companies-house-response.dto';
import { CompaniesHouseNotFoundException } from '@ukef/helper-modules/companies-house/exception/companies-house-not-found.exception';

import { SectorIndustryEntity } from '../sector-industries/entities/sector-industry.entity';
import { SectorIndustriesService } from '../sector-industries/sector-industries.service';
import { GetCompanyResponse, Industry } from './dto/get-company-response.dto';
import { CompaniesOverseasCompanyException } from './exception/companies-overseas-company-exception.exception';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly companiesHouseService: CompaniesHouseService,
    private readonly sectorIndustriesService: SectorIndustriesService,
  ) {}

  async getCompanyByRegistrationNumber(registrationNumber: string): Promise<GetCompanyResponse> {
    try {
      const company: GetCompanyCompaniesHouseResponse = await this.companiesHouseService.getCompanyByRegistrationNumber(registrationNumber);
      this.validateCompanyIsUkCompany(company, registrationNumber);

      const industryClasses: SectorIndustryEntity[] = await this.sectorIndustriesService.find(null, null);

      const mappedCompany = this.mapCompany(company, industryClasses);

      return mappedCompany;
    } catch (error) {
      if (error instanceof CompaniesHouseNotFoundException) {
        throw new NotFoundException('Not found', { cause: error });
      }

      if (error instanceof CompaniesOverseasCompanyException) {
        throw new UnprocessableEntityException('Unprocessable entity', { cause: error });
      }

      throw error;
    }
  }

  private validateCompanyIsUkCompany(company: GetCompanyCompaniesHouseResponse, registrationNumber: string): never | undefined {
    if (company.type.includes('oversea')) {
      throw new CompaniesOverseasCompanyException(`Company with registration number ${registrationNumber} is an overseas company. UKEF can only process applications from companies based in the UK.`);
    }
  }

  private mapCompany(company: GetCompanyCompaniesHouseResponse, industryClasses: SectorIndustryEntity[]): GetCompanyResponse {
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
      industries: this.mapSicCodes(company.sic_codes, industryClasses),
    };
  }

  private mapSicCodes(sicCodes: string[], industryClasses: SectorIndustryEntity[]): Industry[] {
    const industries = [];

    sicCodes.forEach((sicCode) => {
      industryClasses.forEach((industryClass) => {
        if (sicCode === industryClass.ukefIndustryId) {
          industries.push({
            sector: {
              code: industryClass.ukefSectorId.toString(),
              name: industryClass.ukefSectorName,
            },
            class: {
              code: industryClass.ukefIndustryId,
              name: industryClass.ukefIndustryName,
            },
          });
        }
      });
    });

    return industries;
  }
}
