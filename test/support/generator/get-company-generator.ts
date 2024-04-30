import { GetCompanyResponse } from '@ukef/modules/companies/dto/get-company-response.dto';

import { AbstractGenerator } from './abstract-generator';
import { RandomValueGenerator } from './random-value-generator';

export class GetCompanyGenerator extends AbstractGenerator<CompanyValues, GenerateResult, GenerateOptions> {
  constructor(protected readonly valueGenerator: RandomValueGenerator) {
    super(valueGenerator);
  }

  protected generateValues(): CompanyValues {
    return {};
  }

  // eslint-disable-next-line unused-imports/no-unused-vars
  protected transformRawValuesToGeneratedValues(values: CompanyValues[], {}: GenerateOptions): GenerateResult {
    return null;
  }
}

interface CompanyValues {}

interface GenerateOptions {}

interface GenerateResult {
  getCompanyResponse: GetCompanyResponse;
}
