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
      companyRegNo: '0' + this.valueGenerator.stringOfNumericCharacters({ length: 7 }),
      creditClassificationDate: salesforceFormattedCurrentDate(),
      creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      isLegacyRecord: this.valueGenerator.boolean(),
      name: this.valueGenerator.word(),
      partyUrn: '003' + this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
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
    const request: GetCustomersQueryDto[] = values.map((v) => {
      let searchParam = {
        ...(query.companyReg ? { companyReg: query.companyReg } : {}),
        ...(query.name ? { name: query.name } : {}),
        ...(query.partyUrn ? { partyUrn: query.partyUrn } : {}),
      };

      if (Object.keys(searchParam).length === 0) {
        searchParam = { name: v.name };
      }

      return { ...searchParam, ...{ fallbackToLegacyData: query.fallbackToLegacyData ? query.fallbackToLegacyData : ENUMS.FALLBACK_TO_LEGACY_DATA.YES } };
    });

    const informaticaRequest: GetCustomersInformaticaQueryDto[] = request.map((v) => ({
      ...(v.companyReg ? { companyreg: v.companyReg } : {}),
      ...(v.name ? { name: v.name } : {}),
      ...(v.partyUrn ? { partyUrn: v.partyUrn } : {}),
      ...{ includeLegacyData: v.fallbackToLegacyData },
    }));

    const informaticaPath: string = '/v1/p-sa-impl-get-account-or-legacy?' + new URLSearchParams(informaticaRequest[0] as URLSearchParams).toString();

    const mdmPath: string = '/api/v1/customers?' + new URLSearchParams(request[0] as URLSearchParams).toString();

    const getCustomersResponse: GetCustomersResponse[] = values.map((v) => [
      {
        companyRegNo: v.companyRegNo,
        creditClassificationDate: v.creditClassificationDate,
        creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
        customerType: v.customerType,
        isLegacyRecord: v.isLegacyRecord,
        name: v.name,
        partyUrn: v.partyUrn,
        probabilityOfDefault: v.probabilityOfDefault,
        riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
        sfId: v.sfId,
        subtype: v.subtype,
        type: v.type,
        ukEntity: v.ukEntity,
        ukefIndustryName: v.ukefIndustryName,
        ukefSectorName: v.ukefSectorName,
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

interface CustomerValues {
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
}

interface GenerateOptions {
  query?: { [key: string]: any };
}

interface GenerateResult {
  request: GetCustomersQueryDto[];
  informaticaRequest: GetCustomersInformaticaQueryDto[];
  informaticaPath: string;
  mdmPath: string;
  getCustomersResponse: GetCustomersResponse[];
}
