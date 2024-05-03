import { GetCompanyCompaniesHouseResponse } from '@ukef/helper-modules/companies-house/dto/get-company-companies-house-response.dto';
import { GetCompanyResponse } from '@ukef/modules/companies/dto/get-company-response.dto';

import { AbstractGenerator } from './abstract-generator';
import { RandomValueGenerator } from './random-value-generator';

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
      sicCode1: this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
      sicCode2: this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
      sicCode3: this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
      sicCode4: this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
    };
  }

  protected transformRawValuesToGeneratedValues(values: CompanyValues[], { registrationNumber }: GenerateOptions): GenerateResult {
    const [v] = values;
    const registrationNumberToUse = registrationNumber || v.companiesHouseRegistrationNumber;

    const randomDateString = () => this.valueGenerator.date().toISOString().split('T')[0];
    const randomAccountingReferenceDate = this.valueGenerator.date();

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
      sic_codes: [v.sicCode1, v.sicCode2, v.sicCode3, v.sicCode4],
      type: 'ltd',
      undeliverable_registered_office_address: false,
      has_super_secure_pscs: false,
      can_file: true,
    };

    const getCompanyResponse: GetCompanyResponse = {
      companiesHouseRegistrationNumber: registrationNumberToUse,
      companyName: v.companyName,
      registeredAddress: {
        addressLine1: `${v.buildingName} ${v.buildingNumber} ${v.thoroughfareName}`,
        locality: v.locality,
        postalCode: v.postalCode,
        country: v.country,
      },
      sicCodes: [v.sicCode1, v.sicCode2, v.sicCode3, v.sicCode4],
    };

    const companiesHousePath = `/company/${registrationNumberToUse}`;
    const mdmPath = `/api/v1/companies?registrationNumber=${registrationNumberToUse}`;

    return {
      getCompanyCompaniesHouseResponse,
      getCompanyResponse,
      companiesHousePath,
      mdmPath,
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
  sicCode1: string;
  sicCode2: string;
  sicCode3: string;
  sicCode4: string;
}

interface GenerateOptions {
  registrationNumber?: string;
}

interface GenerateResult {
  getCompanyCompaniesHouseResponse: GetCompanyCompaniesHouseResponse;
  getCompanyResponse: GetCompanyResponse;
  companiesHousePath: string;
  mdmPath: string;
}
