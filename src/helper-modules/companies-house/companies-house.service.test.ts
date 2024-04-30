import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
// eslint-disable-line unused-imports/no-unused-vars
// eslint-disable-line unused-imports/no-unused-vars
import { of } from 'rxjs'; // eslint-disable-line unused-imports/no-unused-vars
import expectedResponseData = require('./examples/example-response-for-get-company-by-registration-number.json');
import noResultsResponseData = require('./examples/example-response-for-get-company-by-registration-number-no-results.json'); // eslint-disable-line unused-imports/no-unused-vars

// eslint-disable-line unused-imports/no-unused-vars
import { CompaniesHouseService } from './companies-house.service';

describe('CompaniesHouseService', () => {
  const valueGenerator = new RandomValueGenerator();

  let httpServiceGet: jest.Mock;
  let configServiceGet: jest.Mock;
  let service: CompaniesHouseService; // eslint-disable-line unused-imports/no-unused-vars

  const testKey = valueGenerator.string({ length: 10 });

  // eslint-disable-next-line unused-imports/no-unused-vars
  const expectedResponse = of({
    data: expectedResponseData,
    status: 200,
    statusText: 'OK',
    config: undefined,
    headers: undefined,
  });

  beforeEach(() => {
    const httpService = new HttpService();
    const configService = new ConfigService();
    httpServiceGet = jest.fn();
    httpService.get = httpServiceGet;

    configServiceGet = jest.fn().mockReturnValue({ key: testKey });
    configService.get = configServiceGet;

    service = new CompaniesHouseService(httpService, configService);
  });

  describe('getCompanyByRegistrationNumber', () => {});
});
