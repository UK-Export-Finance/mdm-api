import { withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import nock from 'nock';

describe('GET /companies?registration-number=', () => {
  const valueGenerator = new RandomValueGenerator();

  let api: Api;

  const {
    getCompanyResponse, // eslint-disable-line unused-imports/no-unused-vars
  } = new GetCompanyGenerator(valueGenerator).generate({
    numberToGenerate: 2,
  });

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });

  // MDM auth tests
  withClientAuthenticationTests({
    givenTheRequestWouldOtherwiseSucceed: () => {},
    makeRequestWithoutAuth: () => null,
  });
});
