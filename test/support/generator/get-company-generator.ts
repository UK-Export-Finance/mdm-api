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
    const [v] = values;
    const registrationNumberToUse = registrationNumber || v.companiesHouseRegistrationNumber;

    const companiesHousePath = `/company/${registrationNumberToUse}`;

    const mdmPath = `${COMPANIES.ENDPOINT_BASE_URL}${registrationNumberToUse}`;

    const randomISO8601Date = () => this.valueGenerator.dateISO8601();

    const shuffleArray = <T>(array: Array<T>) => {
      for (const i of [...Array(array.length).keys()].reverse().slice(0, -1)) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[`${i}`], array[`${i}`]] = [array[`${j}`], array[`${i}`]];
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
          period_end_on: v.accounts.lastAccounts.periodEndOn,
          type: v.accounts.lastAccounts.type,
          made_up_to: v.accounts.lastAccounts.madeUpTo,
          period_start_on: v.accounts.lastAccounts.periodStartOn,
        },
        accounting_reference_date: {
          month: v.accounts.accountingReferenceDate.month,
          day: v.accounts.accountingReferenceDate.day,
        },
        next_accounts: {
          period_start_on: v.accounts.nextAccounts.periodStartOn,
          due_on: v.accounts.nextAccounts.dueOn,
          period_end_on: v.accounts.nextAccounts.periodEndOn,
          overdue: v.accounts.nextAccounts.overdue,
        },
        overdue: v.accounts.overdue,
        next_made_up_to: v.accounts.nextMadeUpTo,
        next_due: v.accounts.nextDue,
      },
      company_name: v.companyName,
      company_number: registrationNumberToUse,
      company_status: 'active',
      confirmation_statement: {
        next_made_up_to: randomISO8601Date(),
        next_due: randomISO8601Date(),
        overdue: false,
        last_made_up_to: randomISO8601Date(),
      },
      date_of_creation: v.dateOfCreation,
      etag: this.valueGenerator.stringOfNumericCharacters({ length: 40 }),
      has_charges: false,
      has_insolvency_history: false,
      jurisdiction: this.valueGenerator.word(),
      registered_office_address: {
        organisation_name: v.companyName,
        address_line_1: `${v.buildingName} ${v.buildingNumber} ${v.thoroughfareName}`,
        address_line_2: v.buildingNumber,
        address_line_3: v.thoroughfareName,
        care_of: v.careOf,
        locality: v.locality,
        postal_code: v.postalCode,
        premises: v.premises,
        region: v.region,
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
      ukefIndustryName: v.industryClassNames[`${index}`],
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
      code: v.industrySectorCode.toString(),
      name: v.industrySectorName,
      class: {
        code: sicCode,
        name: v.industryClassNames[`${index}`],
      },
    }));

    const getCompanyResponse: GetCompanyResponse = {
      accounts: {
        accountingReferenceDate: {
          month: v.accounts.accountingReferenceDate.month,
          day: v.accounts.accountingReferenceDate.day,
        },
        lastAccounts: {
          periodEndOn: v.accounts.lastAccounts.periodEndOn,
          type: v.accounts.lastAccounts.type,
          madeUpTo: v.accounts.lastAccounts.madeUpTo,
          periodStartOn: v.accounts.lastAccounts.periodStartOn,
        },
        nextAccounts: {
          periodStartOn: v.accounts.nextAccounts.periodStartOn,
          dueOn: v.accounts.nextAccounts.dueOn,
          periodEndOn: v.accounts.nextAccounts.periodEndOn,
          overdue: v.accounts.nextAccounts.overdue,
        },
        nextDue: v.accounts.nextDue,
        nextMadeUpTo: v.accounts.nextMadeUpTo,
        overdue: v.accounts.overdue,
      },
      companiesHouseRegistrationNumber: registrationNumberToUse,
      companyName: v.companyName,
      dateOfCreation: v.dateOfCreation,
      registeredAddress: {
        organisationName: v.companyName,
        addressLine1: `${v.buildingName} ${v.buildingNumber} ${v.thoroughfareName}`,
        addressLine2: v.buildingNumber,
        addressLine3: v.thoroughfareName,
        careOf: v.careOf,
        locality: v.locality,
        postalCode: v.postalCode,
        premises: v.premises,
        region: v.region,
        country: v.country,
      },
      industries,
      isActive: v.isActive,
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

interface CompanyValues {
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
  getCompanyCompaniesHouseOverseasCompanyResponse: GetCompanyCompaniesHouseResponse;
  getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse: GetCompanyCompaniesHouseErrorResponse;
  getCompanyCompaniesHouseInvalidAuthorizationResponse: GetCompanyCompaniesHouseErrorResponse;
  getCompanyCompaniesHouseNotFoundResponse: GetCompanyCompaniesHouseMultipleErrorResponse;
}
