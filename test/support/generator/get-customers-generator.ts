import { ENUMS, EXAMPLES } from '@ukef/constants';
import { salesforceFormattedCurrentDate } from '@ukef/helpers/date-formatter.helper';
import { GetCustomersQueryDto } from '@ukef/modules/customers/dto/get-customers-query.dto';
import { GetCustomersResponse } from '@ukef/modules/customers/dto/get-customers-response.dto';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';

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
      isLegacyRecord: this.valueGenerator.boolean(),
      name: this.valueGenerator.word(),
      partyUrn: `003${this.valueGenerator.stringOfNumericCharacters({ length: 5 })}`,
      probabilityOfDefault: this.valueGenerator.integer({ min: 1, max: 14 }),
      riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
      sfId: this.valueGenerator.word(),
      subtype: null,
      type: null,
      ukEntity: this.valueGenerator.stringOfNumericCharacters({ length: 3 }),
      ukefIndustryName: this.valueGenerator.stringOfNumericCharacters({ length: 100 }),
      ukefSectorName: this.valueGenerator.stringOfNumericCharacters({ length: 100 }),
    };
  }

  protected transformRawValuesToGeneratedValues(
    values: CustomerValues[],
    { query = { fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES } }: GenerateOptions,
  ): GenerateResult {
    const request: GetCustomersQueryDto[] = values.map((customer) => {
      let searchParam = {
        ...(query.companyReg ? { companyReg: query.companyReg } : {}),
        ...(query.name ? { name: query.name } : {}),
        ...(query.partyUrn ? { partyUrn: query.partyUrn } : {}),
      };

      if (Object.keys(searchParam).length === 0) {
        searchParam = {
          name: customer.name,
        };
      }

      return { ...searchParam, ...{ fallbackToLegacyData: query.fallbackToLegacyData ? query.fallbackToLegacyData : ENUMS.FALLBACK_TO_LEGACY_DATA.YES } };
    });

    const informaticaRequest: GetCustomersInformaticaQueryDto[] = request.map((customer) => ({
      ...(customer.companyReg ? { companyreg: customer.companyReg } : {}),
      ...(customer.name ? { name: customer.name } : {}),
      ...(customer.partyUrn ? { partyUrn: customer.partyUrn } : {}),
      ...{ includeLegacyData: customer.fallbackToLegacyData },
    }));

    const informaticaPath = `/v1/p-sa-impl-get-account-or-legacy?${new URLSearchParams(informaticaRequest[0] as URLSearchParams).toString()}`;

    const mdmPath = `/api/v1/customers?${new URLSearchParams(request[0] as URLSearchParams).toString()}`;

    const getCustomersResponse: GetCustomersResponse[] = values.map((customer) => [
      {
        companyRegNo: customer.companyRegNo,
        creditClassificationDate: customer.creditClassificationDate,
        creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
        customerType: customer.customerType,
        isLegacyRecord: customer.isLegacyRecord,
        name: customer.name,
        partyUrn: customer.partyUrn,
        probabilityOfDefault: customer.probabilityOfDefault,
        riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
        sfId: customer.sfId,
        subtype: customer.subtype,
        type: customer.type,
        ukEntity: customer.ukEntity,
        ukefIndustryName: customer.ukefIndustryName,
        ukefSectorName: customer.ukefSectorName,
      },
    ]);

    return {
      request,
      informaticaRequest,
      informaticaPath,
      mdmPath,
      getCustomersResponse,
    };
  }
}

type CustomerValues = {
  companyRegNo: string;
  creditClassificationDate: string;
  creditClassificationStatus: string;
  customerType: string;
  isLegacyRecord: boolean;
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
  query?: Record<string, any>;
};

type GenerateResult = {
  request: GetCustomersQueryDto[];
  informaticaRequest: GetCustomersInformaticaQueryDto[];
  informaticaPath: string;
  mdmPath: string;
  getCustomersResponse: GetCustomersResponse[];
};
