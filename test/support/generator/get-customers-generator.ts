import { ENUMS, EXAMPLES } from '@ukef/constants';
import { salesforceFormattedCurrentDate } from '@ukef/helpers/date-formatter.helper';
import { GetCustomersQueryDto } from '@ukef/modules/customers/dto/get-customers-query.dto';
import { GetCustomersResponse } from '@ukef/modules/customers/dto/get-customers-response.dto';
import { GetSalesforceAccountResponseDto } from '@ukef/modules/salesforce/dto/get-salesforce-account-response.dto';
import { GetSalesforceLegacyAccountResponseDto } from '@ukef/modules/salesforce/dto/get-salesforce-legacy-account-response.dto';

import { AbstractGenerator } from './abstract-generator';
import { RandomValueGenerator } from './random-value-generator';

export class GetCustomersGenerator extends AbstractGenerator<CustomerValues, GenerateResult, GenerateOptions> {
  constructor(protected readonly valueGenerator: RandomValueGenerator) {
    super(valueGenerator);
  }

  protected generateValues(): CustomerValues {
    return {
      companyRegNo: `0${this.valueGenerator.stringOfNumericCharacters({ length: 7 })}`,
      creditClassificationDate: salesforceFormattedCurrentDate(),
      creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      name: this.valueGenerator.sentence({ words: 2 }),
      partyUrn: `003${this.valueGenerator.stringOfNumericCharacters({ length: 5 })}`,
      probabilityOfDefault: this.valueGenerator.integer({ min: 1, max: 14 }),
      riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
      sfId: this.valueGenerator.string({ length: 18 }),
      subtype: EXAMPLES.CUSTOMER.SALESFORCE_SUBTYPE,
      type: EXAMPLES.CUSTOMER.SALESFORCE_TYPE,
      ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
      ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
      ukefSectorName: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
    };
  }

  protected transformRawValuesToGeneratedValues(
    values: CustomerValues[],
    { query = { fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES } }: GenerateOptions,
  ): GenerateResult {
    const request: GetCustomersQueryDto[] = values.map((customer) => {
      const searchParam = {
        ...(query.companyReg ? { companyReg: query.companyReg } : {}),
        ...(query.name ? { name: query.name } : {}),
        ...(query.partyUrn ? { partyUrn: query.partyUrn } : {}),
      };

      return {
        ...(Object.keys(searchParam).length ? searchParam : { name: customer.name }),
        fallbackToLegacyData: query.fallbackToLegacyData || ENUMS.FALLBACK_TO_LEGACY_DATA.YES,
      };
    });

    const customers = values.map((customer) => ({
      ...customer,
      companyRegNo: query.companyReg ?? customer.companyRegNo,
      name: query.name ?? customer.name,
      partyUrn: query.partyUrn ?? customer.partyUrn,
    }));

    const getSalesforceCustomers: GetSalesforceAccountResponseDto[] = customers.map(
      (customer) =>
        ({
          Id: customer.sfId,
          Name: customer.name,
          Party_URN__c: customer.partyUrn,
          Company_Registration_Number__c: customer.companyRegNo,
          CCM_Probability_of_Default__c: customer.probabilityOfDefault,
          CCM_Customer_Type__c: customer.customerType,
          CCM_Citizenship_Class__c: customer.ukEntity,
          CCM_Industry__c: customer.ukefIndustryName,
          CCM_Industry_Group__c: customer.ukefSectorName,
          Account_Type__c: customer.type,
          Account_Sub_Type__c: customer.subtype,
          CCM_Risk_Entity__c: customer.riskEntity,
          CCM_Credit_Risk_Rating__c: customer.creditClassificationStatus,
          CCM_Credit_Risk_Rating_Date__c: customer.creditClassificationDate,
        }) as GetSalesforceAccountResponseDto,
    );

    const getSalesforceLegacyCustomers: GetSalesforceLegacyAccountResponseDto[] = customers.map(
      (customer) =>
        ({
          Id: this.valueGenerator.string({ length: 18 }),
          M2_1_MCD_Party_URN__c: customer.partyUrn,
          M2_1_MCD_Party_Name__c: customer.name,
          M2_1_MCD_Company_Reg_Number__c: customer.companyRegNo,
          M2_1_MCD_UK_or_Overseas__c: customer.ukEntity,
          M2_1_MCD_Party_Type__c: customer.type,
          M2_1_MCD_Party_Sub_Type__c: customer.subtype,
        }) as GetSalesforceLegacyAccountResponseDto,
    );

    const getCustomersResponse: GetCustomersResponse = getSalesforceCustomers.map((customer) => ({
      partyUrn: customer.Party_URN__c,
      name: customer.Name,
      sfId: customer.Id,
      companyRegNo: customer.Company_Registration_Number__c,
      probabilityOfDefault: customer.CCM_Probability_of_Default__c,
      ukEntity: customer.CCM_Citizenship_Class__c,
      ukefIndustryName: customer.CCM_Industry__c,
      ukefSectorName: customer.CCM_Industry_Group__c,
      type: customer.Account_Type__c,
      subtype: customer.Account_Sub_Type__c,
      isLegacyRecord: false,
      riskEntity: customer.CCM_Risk_Entity__c,
      creditClassificationStatus: customer.CCM_Credit_Risk_Rating__c,
      creditClassificationDate: customer.CCM_Credit_Risk_Rating_Date__c,
    }));

    const getLegacyCustomersResponse: GetCustomersResponse = getSalesforceLegacyCustomers.map((customer) => ({
      partyUrn: customer.M2_1_MCD_Party_URN__c,
      name: customer.M2_1_MCD_Party_Name__c,
      sfId: customer.Id,
      companyRegNo: customer.M2_1_MCD_Company_Reg_Number__c,
      probabilityOfDefault: null,
      ukEntity: customer.M2_1_MCD_UK_or_Overseas__c,
      ukefIndustryName: null,
      ukefSectorName: null,
      type: customer.M2_1_MCD_Party_Type__c,
      subtype: customer.M2_1_MCD_Party_Sub_Type__c,
      isLegacyRecord: true,
      riskEntity: null,
      creditClassificationStatus: null,
      creditClassificationDate: null,
    }));

    const firstRequest = request[0] ?? { fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES };
    const mdmPath = `/api/v1/customers?${new URLSearchParams(
      Object.entries(firstRequest).map(([key, value]): [string, string] => [key, String(value)]),
    ).toString()}`;

    return {
      request,
      mdmPath,
      getSalesforceCustomers,
      getSalesforceLegacyCustomers,
      getCustomersResponse,
      getLegacyCustomersResponse,
    };
  }
}

type CustomerValues = {
  companyRegNo: string;
  creditClassificationDate: string;
  creditClassificationStatus: string;
  customerType: string;
  name: string;
  partyUrn: string;
  probabilityOfDefault: number;
  riskEntity: string;
  sfId: string;
  subtype: string;
  type: string;
  ukEntity: string;
  ukefIndustryName: string;
  ukefSectorName: string;
};

type GenerateOptions = {
  query?: Partial<GetCustomersQueryDto>;
};

type GenerateResult = {
  request: GetCustomersQueryDto[];
  mdmPath: string;
  getSalesforceCustomers: GetSalesforceAccountResponseDto[];
  getSalesforceLegacyCustomers: GetSalesforceLegacyAccountResponseDto[];
  getCustomersResponse: GetCustomersResponse;
  getLegacyCustomersResponse: GetCustomersResponse;
};
