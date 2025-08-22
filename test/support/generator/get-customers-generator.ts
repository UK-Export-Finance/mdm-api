import { CREDIT_CLASSIFICATION_STATUS, ENUMS, RISK_ENTITY } from '@ukef/constants';
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
      partyUrn: '003' + this.valueGenerator.stringOfNumericCharacters({ length: 5 }),
      name: this.valueGenerator.word(),
      sfId: this.valueGenerator.word(),
      companyRegNo: '0' + this.valueGenerator.stringOfNumericCharacters({ length: 7 }),
      probabilityOfDefault: this.valueGenerator.integer({ min: 1, max: 14 }),
      ukEntity: this.valueGenerator.stringOfNumericCharacters({ length: 3 }),
      ukefIndustryName: this.valueGenerator.stringOfNumericCharacters({ length: 100 }),
      ukefSectorName: this.valueGenerator.stringOfNumericCharacters({ length: 100 }),
      type: null,
      subtype: null,
      isLegacyRecord: this.valueGenerator.boolean(),
      riskEntity: RISK_ENTITY.CORPORATE,
      creditClassificationStatus: CREDIT_CLASSIFICATION_STATUS.GOOD,
      creditClassificationDate: salesforceFormattedCurrentDate(),
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

    const informaticaPath: string = '/account?' + new URLSearchParams(informaticaRequest[0] as URLSearchParams).toString();

    const mdmPath: string = '/api/v1/customers?' + new URLSearchParams(request[0] as URLSearchParams).toString();

    const getCustomersResponse: GetCustomersResponse[] = values.map((v) => [
      {
        partyUrn: v.partyUrn,
        name: v.name,
        sfId: v.sfId,
        companyRegNo: v.companyRegNo,
        probabilityOfDefault: v.probabilityOfDefault,
        ukEntity: v.ukEntity,
        ukefIndustryName: v.ukefIndustryName,
        ukefSectorName: v.ukefSectorName,
        type: v.type,
        subtype: v.subtype,
        isLegacyRecord: v.isLegacyRecord,
        riskEntity: RISK_ENTITY.CORPORATE,
        creditClassificationStatus: CREDIT_CLASSIFICATION_STATUS.GOOD,
        creditClassificationDate: v.creditClassificationDate,
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
  partyUrn: string;
  name: string;
  sfId: string;
  companyRegNo: string;
  probabilityOfDefault: number;
  ukEntity: string;
  ukefIndustryName: string;
  ukefSectorName: string;
  type: string;
  subtype: string;
  isLegacyRecord: boolean;
  riskEntity: string;
  creditClassificationStatus: string;
  creditClassificationDate: string;
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
