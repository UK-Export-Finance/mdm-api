import { GetCompanyCompaniesHouseErrorResponse } from '@ukef/helper-modules/companies-house/dto/get-company-companies-house-error-response.dto';
import { GetCompanyCompaniesHouseMultipleErrorResponse } from '@ukef/helper-modules/companies-house/dto/get-company-companies-house-multiple-error-response.dto';
import { GetCompanyCompaniesHouseResponse } from '@ukef/helper-modules/companies-house/dto/get-company-companies-house-response.dto';
import { GetCompanyResponse, Industry } from '@ukef/modules/companies/dto/get-company-response.dto';
import { SectorIndustryEntity } from '@ukef/modules/sector-industries/entities/sector-industry.entity';

import { AbstractGenerator } from './abstract-generator';
import { RandomValueGenerator } from './random-value-generator';
import { COMPANIES } from '@ukef/constants';

export class GetCompanyGenerator extends AbstractGenerator<CompanyValues, GenerateResult, GenerateOptions> {
  constructor(protected readonly valueGenerator: RandomValueGenerator) {
    super(valueGenerator);
  }

  protected generateValues(): CompanyValues {
    return {
      companiesHouseRegistrationNumber: this.valueGenerator.stringOfNumericCharacters({ length: 8 }),
      companyName: this.valueGenerator.sentence({ words: 2 }),
      buildingName: this.valueGenerator.sentence({ words: 2 }),
      buildingNumber: this.valueGenerator.nonnegativeInteger({ max: 99 }).toString(),
      thoroughfareName: this.valueGenerator.sentence({ words: 2 }),
      locality: this.valueGenerator.word(),
      postalCode: this.valueGenerator.postcode(),
      country: this.valueGenerator.word(),
      sicCodes: [
        this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
        this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
        this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
        this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
      ],
      industryClassNames: [
        this.valueGenerator.sentence({ words: 10 }),
        this.valueGenerator.sentence({ words: 10 }),
        this.valueGenerator.sentence({ words: 10 }),
        this.valueGenerator.sentence({ words: 10 }),
      ],
      industrySectorCode: this.valueGenerator.integer({ min: 1001, max: 1020 }),
      industrySectorName: this.valueGenerator.sentence({ words: 4 }),
    };
  }

  protected transformRawValuesToGeneratedValues(values: CompanyValues[], { registrationNumber }: GenerateOptions): GenerateResult {
    const [v] = values;
    const registrationNumberToUse = registrationNumber || v.companiesHouseRegistrationNumber;

    const companiesHousePath = `/company/${registrationNumberToUse}`;

    const mdmPath = `${COMPANIES.ENDPOINT_BASE_URL}${registrationNumberToUse}`;

    const randomDateString = () => this.valueGenerator.date().toISOString().split('T')[0];
    const randomAccountingReferenceDate = this.valueGenerator.date();

    const shuffleArray = (array: any[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const getCompanyCompaniesHouseResponse: GetCompanyCompaniesHouseResponse = {
      links: {
        filing_history: `/company/${registrationNumberToUse}/filing-history`,
        self: `/company/${registrationNumberToUse}`,
        persons_with_significant_control: `/company/${registrationNumberToUse}/persons-with-significant-control`,
        officers: `/company/${registrationNumberToUse}/officers`,
      },
      accounts: {
        last_accounts: {
          period_end_on: randomDateString(),
          type: 'micro-entity',
          made_up_to: randomDateString(),
          period_start_on: randomDateString(),
        },
        accounting_reference_date: {
          month: (randomAccountingReferenceDate.getMonth() + 1).toString(),
          day: randomAccountingReferenceDate.getDate().toString(),
        },
        overdue: false,
        next_made_up_to: randomDateString(),
        next_due: randomDateString(),
        next_accounts: {
          period_start_on: randomDateString(),
          due_on: randomDateString(),
          period_end_on: randomDateString(),
          overdue: false,
        },
      },
      company_name: v.companyName,
      company_number: registrationNumberToUse,
      company_status: 'active',
      confirmation_statement: {
        next_made_up_to: randomDateString(),
        next_due: randomDateString(),
        overdue: false,
        last_made_up_to: randomDateString(),
      },
      date_of_creation: randomDateString(),
      etag: this.valueGenerator.stringOfNumericCharacters({ length: 40 }),
      has_charges: false,
      has_insolvency_history: false,
      jurisdiction: 'england-wales',
      registered_office_address: {
        address_line_1: `${v.buildingName} ${v.buildingNumber} ${v.thoroughfareName}`,
        locality: v.locality,
        postal_code: v.postalCode,
        country: v.country,
      },
      registered_office_is_in_dispute: false,
      sic_codes: v.sicCodes,
      type: 'ltd',
      undeliverable_registered_office_address: false,
      has_super_secure_pscs: false,
      can_file: true,
    };

    const findSectorIndustriesResponse: SectorIndustryEntity[] = v.sicCodes.map((sicCode, index) => ({
      id: this.valueGenerator.integer({ min: 1, max: 1000 }),
      ukefSectorId: v.industrySectorCode,
      ukefSectorName: v.industrySectorName,
      internalNo: null,
      ukefIndustryId: sicCode,
      ukefIndustryName: v.industryClassNames[index],
      acbsSectorId: this.valueGenerator.stringOfNumericCharacters({ length: 2 }),
      acbsSectorName: this.valueGenerator.sentence({ words: 5 }),
      acbsIndustryId: this.valueGenerator.stringOfNumericCharacters({ length: 2 }),
      acbsIndustryName: this.valueGenerator.sentence({ words: 4 }),
      created: this.valueGenerator.date(),
      updated: this.valueGenerator.date(),
      effectiveFrom: this.valueGenerator.date(),
      effectiveTo: this.valueGenerator.date(),
    }));

    const nonMatchingIndustryClass: SectorIndustryEntity = {
      id: this.valueGenerator.integer({ min: 1, max: 1000 }),
      ukefSectorId: this.valueGenerator.integer({ min: 1001, max: 1020 }),
      ukefSectorName: this.valueGenerator.sentence({ words: 4 }),
      internalNo: null,
      ukefIndustryId: this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
      ukefIndustryName: this.valueGenerator.sentence({ words: 10 }),
      acbsSectorId: this.valueGenerator.stringOfNumericCharacters({ length: 2 }),
      acbsSectorName: this.valueGenerator.sentence({ words: 5 }),
      acbsIndustryId: this.valueGenerator.stringOfNumericCharacters({ length: 2 }),
      acbsIndustryName: this.valueGenerator.sentence({ words: 4 }),
      created: this.valueGenerator.date(),
      updated: this.valueGenerator.date(),
      effectiveFrom: this.valueGenerator.date(),
      effectiveTo: this.valueGenerator.date(),
    };

    findSectorIndustriesResponse.push(nonMatchingIndustryClass);
    shuffleArray(findSectorIndustriesResponse);

    const industries: Industry[] = v.sicCodes.map((sicCode, index) => ({
      sector: {
        code: v.industrySectorCode.toString(),
        name: v.industrySectorName,
      },
      class: {
        code: sicCode,
        name: v.industryClassNames[index],
      },
    }));

    const getCompanyResponse: GetCompanyResponse = {
      companiesHouseRegistrationNumber: registrationNumberToUse,
      companyName: v.companyName,
      registeredAddress: {
        addressLine1: `${v.buildingName} ${v.buildingNumber} ${v.thoroughfareName}`,
        locality: v.locality,
        postalCode: v.postalCode,
        country: v.country,
      },
      industries,
    };

    const getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse: GetCompanyCompaniesHouseErrorResponse = {
      error: 'Invalid Authorization header',
      type: 'ch:service',
    };

    const getCompanyCompaniesHouseInvalidAuthorizationResponse: GetCompanyCompaniesHouseErrorResponse = {
      error: 'Invalid Authorization',
      type: 'ch:service',
    };

    const getCompanyCompaniesHouseNotFoundResponse: GetCompanyCompaniesHouseMultipleErrorResponse = {
      errors: [
        {
          error: 'company-profile-not-found',
          type: 'ch:service',
        },
      ],
    };

    return {
      companiesHousePath,
      mdmPath,
      getCompanyCompaniesHouseResponse,
      findSectorIndustriesResponse,
      getCompanyResponse,
      getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse,
      getCompanyCompaniesHouseInvalidAuthorizationResponse,
      getCompanyCompaniesHouseNotFoundResponse,
    };
  }
}

interface CompanyValues {
  companiesHouseRegistrationNumber: string;
  companyName: string;
  buildingName: string;
  buildingNumber: string;
  thoroughfareName: string;
  locality: string;
  postalCode: string;
  country: string;
  sicCodes: string[];
  industryClassNames: string[];
  industrySectorCode: number;
  industrySectorName: string;
}

interface GenerateOptions {
  registrationNumber?: string;
}

interface GenerateResult {
  companiesHousePath: string;
  mdmPath: string;
  getCompanyCompaniesHouseResponse: GetCompanyCompaniesHouseResponse;
  findSectorIndustriesResponse: SectorIndustryEntity[];
  getCompanyResponse: GetCompanyResponse;
  getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse: GetCompanyCompaniesHouseErrorResponse;
  getCompanyCompaniesHouseInvalidAuthorizationResponse: GetCompanyCompaniesHouseErrorResponse;
  getCompanyCompaniesHouseNotFoundResponse: GetCompanyCompaniesHouseMultipleErrorResponse;
}
