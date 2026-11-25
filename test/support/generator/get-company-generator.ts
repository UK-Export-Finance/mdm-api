import { COMPANIES } from '@ukef/constants';
import { GetCompanyCompaniesHouseErrorResponse } from '@ukef/helper-modules/companies-house/dto/get-company-companies-house-error-response.dto';
import { GetCompanyCompaniesHouseMultipleErrorResponse } from '@ukef/helper-modules/companies-house/dto/get-company-companies-house-multiple-error-response.dto';
import { GetCompanyCompaniesHouseResponse } from '@ukef/helper-modules/companies-house/dto/get-company-companies-house-response.dto';
import { GetCompanyResponse, Industry } from '@ukef/modules/companies/dto/get-company-response.dto';
import { SectorIndustryEntity } from '@ukef/modules/sector-industries/entities/sector-industry.entity';

import { AbstractGenerator } from './abstract-generator';
import { RandomValueGenerator } from './random-value-generator';

export class GetCompanyGenerator extends AbstractGenerator<CompanyValues, GenerateResult, GenerateOptions> {
  constructor(protected readonly valueGenerator: RandomValueGenerator) {
    super(valueGenerator);
  }

  protected generateValues(): CompanyValues {
    return {
      accounts: {
        accountingReferenceDate: {
          day: this.valueGenerator.integer({ max: 31 }).toString(),
          month: this.valueGenerator.integer({ max: 12 }).toString(),
        },
        lastAccounts: {
          madeUpTo: this.valueGenerator.dateISO8601(),
          periodEndOn: this.valueGenerator.dateISO8601(),
          periodStartOn: this.valueGenerator.dateISO8601(),
          type: '2053-12-12',
        },
        nextAccounts: {
          dueOn: this.valueGenerator.dateISO8601(),
          overdue: this.valueGenerator.boolean(),
          periodEndOn: this.valueGenerator.dateISO8601(),
          periodStartOn: this.valueGenerator.dateISO8601(),
        },
        nextDue: this.valueGenerator.dateISO8601(),
        nextMadeUpTo: this.valueGenerator.dateISO8601(),
        overdue: this.valueGenerator.boolean(),
      },
      companiesHouseRegistrationNumber: this.valueGenerator.stringOfNumericCharacters({ length: 8 }),
      companyName: this.valueGenerator.sentence({ words: 2 }),
      dateOfCreation: this.valueGenerator.dateISO8601(),
      buildingName: this.valueGenerator.sentence({ words: 2 }),
      buildingNumber: this.valueGenerator.nonnegativeInteger({ max: 99 }).toString(),
      thoroughfareName: this.valueGenerator.sentence({ words: 2 }),
      careOf: this.valueGenerator.sentence({ words: 3 }),
      locality: this.valueGenerator.word(),
      postalCode: this.valueGenerator.postcode(),
      premises: this.valueGenerator.city(),
      region: this.valueGenerator.city(),
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
      isActive: this.valueGenerator.boolean(),
    };
  }

  protected transformRawValuesToGeneratedValues(values: CompanyValues[], { registrationNumber }: GenerateOptions): GenerateResult {
    const [company] = values;
    const registrationNumberToUse = registrationNumber || company.companiesHouseRegistrationNumber;

    const companiesHousePath = `/company/${registrationNumberToUse}`;

    const mdmPath = `${COMPANIES.ENDPOINT_BASE_URL}${registrationNumberToUse}`;

    const randomISO8601Date = () => this.valueGenerator.dateISO8601();

    const getCompanyCompaniesHouseResponse: GetCompanyCompaniesHouseResponse = {
      links: {
        filing_history: `/company/${registrationNumberToUse}/filing-history`,
        self: `/company/${registrationNumberToUse}`,
        persons_with_significant_control: `/company/${registrationNumberToUse}/persons-with-significant-control`,
        officers: `/company/${registrationNumberToUse}/officers`,
      },
      accounts: {
        last_accounts: {
          period_end_on: company.accounts.lastAccounts.periodEndOn,
          type: company.accounts.lastAccounts.type,
          made_up_to: company.accounts.lastAccounts.madeUpTo,
          period_start_on: company.accounts.lastAccounts.periodStartOn,
        },
        accounting_reference_date: {
          month: company.accounts.accountingReferenceDate.month,
          day: company.accounts.accountingReferenceDate.day,
        },
        next_accounts: {
          period_start_on: company.accounts.nextAccounts.periodStartOn,
          due_on: company.accounts.nextAccounts.dueOn,
          period_end_on: company.accounts.nextAccounts.periodEndOn,
          overdue: company.accounts.nextAccounts.overdue,
        },
        overdue: company.accounts.overdue,
        next_made_up_to: company.accounts.nextMadeUpTo,
        next_due: company.accounts.nextDue,
      },
      company_name: company.companyName,
      company_number: registrationNumberToUse,
      company_status: 'active',
      confirmation_statement: {
        next_made_up_to: randomISO8601Date(),
        next_due: randomISO8601Date(),
        overdue: false,
        last_made_up_to: randomISO8601Date(),
      },
      date_of_creation: company.dateOfCreation,
      etag: this.valueGenerator.stringOfNumericCharacters({ length: 40 }),
      has_charges: false,
      has_insolvency_history: false,
      jurisdiction: this.valueGenerator.word(),
      registered_office_address: {
        organisation_name: company.companyName,
        address_line_1: `${company.buildingName} ${company.buildingNumber} ${company.thoroughfareName}`,
        address_line_2: company.buildingNumber,
        address_line_3: company.thoroughfareName,
        care_of: company.careOf,
        locality: company.locality,
        postal_code: company.postalCode,
        premises: company.premises,
        region: company.region,
        country: company.country,
      },
      registered_office_is_in_dispute: false,
      sic_codes: company.sicCodes,
      type: 'ltd',
      undeliverable_registered_office_address: false,
      has_super_secure_pscs: false,
      can_file: true,
    };

    const findSectorIndustriesResponse: SectorIndustryEntity[] = company.sicCodes.map((sicCode, index) => ({
      id: this.valueGenerator.integer({ min: 1, max: 1000 }),
      ukefSectorId: company.industrySectorCode,
      ukefSectorName: company.industrySectorName,
      internalNo: null,
      ukefIndustryId: sicCode,
      ukefIndustryName: company.industryClassNames[`${index}`],
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

    for (let index = findSectorIndustriesResponse.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1));

      [findSectorIndustriesResponse[index], findSectorIndustriesResponse[randomIndex]] = [
        findSectorIndustriesResponse[randomIndex],
        findSectorIndustriesResponse[index],
      ];
    }

    const industries: Industry[] = company.sicCodes.map((sicCode, index) => ({
      code: company.industrySectorCode.toString(),
      name: company.industrySectorName,
      class: {
        code: sicCode,
        name: company.industryClassNames[`${index}`],
      },
    }));

    const getCompanyResponse: GetCompanyResponse = {
      accounts: {
        accountingReferenceDate: {
          month: company.accounts.accountingReferenceDate.month,
          day: company.accounts.accountingReferenceDate.day,
        },
        lastAccounts: {
          periodEndOn: company.accounts.lastAccounts.periodEndOn,
          type: company.accounts.lastAccounts.type,
          madeUpTo: company.accounts.lastAccounts.madeUpTo,
          periodStartOn: company.accounts.lastAccounts.periodStartOn,
        },
        nextAccounts: {
          periodStartOn: company.accounts.nextAccounts.periodStartOn,
          dueOn: company.accounts.nextAccounts.dueOn,
          periodEndOn: company.accounts.nextAccounts.periodEndOn,
          overdue: company.accounts.nextAccounts.overdue,
        },
        nextDue: company.accounts.nextDue,
        nextMadeUpTo: company.accounts.nextMadeUpTo,
        overdue: company.accounts.overdue,
      },
      companiesHouseRegistrationNumber: registrationNumberToUse,
      companyName: company.companyName,
      dateOfCreation: company.dateOfCreation,
      registeredAddress: {
        organisationName: company.companyName,
        addressLine1: `${company.buildingName} ${company.buildingNumber} ${company.thoroughfareName}`,
        addressLine2: company.buildingNumber,
        addressLine3: company.thoroughfareName,
        careOf: company.careOf,
        locality: company.locality,
        postalCode: company.postalCode,
        premises: company.premises,
        region: company.region,
        country: company.country,
      },
      industries,
      isActive: company.isActive,
    };

    const getCompanyCompaniesHouseOverseasCompanyResponse = structuredClone(getCompanyCompaniesHouseResponse);
    getCompanyCompaniesHouseOverseasCompanyResponse.type = 'registered-overseas-entity';

    const getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse: GetCompanyCompaniesHouseErrorResponse = {
      error: 'Invalid Authorization header',
      type: 'ch:service',
    };

    const getCompanyCompaniesHouseInvalidAuthorizationResponse: GetCompanyCompaniesHouseErrorResponse = {
      error: 'Invalid Authorization',
      type: 'ch:service',
    };

    const getCompanyCompaniesHouseNotFoundResponse: GetCompanyCompaniesHouseMultipleErrorResponse = undefined;

    return {
      companiesHousePath,
      mdmPath,
      getCompanyCompaniesHouseResponse,
      findSectorIndustriesResponse,
      getCompanyResponse,
      getCompanyCompaniesHouseOverseasCompanyResponse,
      getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse,
      getCompanyCompaniesHouseInvalidAuthorizationResponse,
      getCompanyCompaniesHouseNotFoundResponse,
    };
  }
}

type CompanyValues = {
  accounts: {
    accountingReferenceDate: {
      day: string;
      month: string;
    };
    lastAccounts: {
      madeUpTo: string;
      periodEndOn: string;
      periodStartOn: string;
      type: string;
    };
    nextAccounts: {
      dueOn: string;
      overdue: boolean;
      periodEndOn: string;
      periodStartOn: string;
    };
    nextDue?: string;
    nextMadeUpTo?: string;
    overdue?: boolean;
  };
  companiesHouseRegistrationNumber: string;
  companyName: string;
  dateOfCreation: string;
  buildingName: string;
  buildingNumber: string;
  thoroughfareName: string;
  locality: string;
  premises: string;
  careOf?: string;
  region: string;
  postalCode: string;
  country: string;
  sicCodes: string[];
  industryClassNames: string[];
  industrySectorCode: number;
  industrySectorName: string;
  isActive: boolean;
};

type GenerateOptions = {
  registrationNumber?: string;
};

type GenerateResult = {
  companiesHousePath: string;
  mdmPath: string;
  getCompanyCompaniesHouseResponse: GetCompanyCompaniesHouseResponse;
  findSectorIndustriesResponse: SectorIndustryEntity[];
  getCompanyResponse: GetCompanyResponse;
  getCompanyCompaniesHouseOverseasCompanyResponse: GetCompanyCompaniesHouseResponse;
  getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse: GetCompanyCompaniesHouseErrorResponse;
  getCompanyCompaniesHouseInvalidAuthorizationResponse: GetCompanyCompaniesHouseErrorResponse;
  getCompanyCompaniesHouseNotFoundResponse: GetCompanyCompaniesHouseMultipleErrorResponse;
};
