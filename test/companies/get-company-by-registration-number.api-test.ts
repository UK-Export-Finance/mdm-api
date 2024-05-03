import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';
import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import nock from 'nock';

describe('GET /companies?registrationNumber=', () => {
  const valueGenerator = new RandomValueGenerator();

  let api: Api;

  const { getCompanyCompaniesHouseResponse, getCompanyResponse, companiesHousePath, mdmPath } = new GetCompanyGenerator(valueGenerator).generate({
    numberToGenerate: 1,
    registrationNumber: '00000001',
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
    givenTheRequestWouldOtherwiseSucceed: () => {
      requestToGetCompanyByRegistrationNumber(companiesHousePath).reply(200, getCompanyCompaniesHouseResponse);
    },
    makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) => api.getWithoutAuth(mdmPath, incorrectAuth?.headerName, incorrectAuth?.headerValue),
  });

  it('returns a 200 response with the company if it is returned by the Companies House API', async () => {
    requestToGetCompanyByRegistrationNumber(companiesHousePath).reply(200, getCompanyCompaniesHouseResponse);

    const { status, body } = await api.get(mdmPath);

    expect(status).toBe(200);
    expect(body).toStrictEqual(getCompanyResponse);
  });

  const requestToGetCompanyByRegistrationNumber = (companiesHousePath: string): nock.Interceptor =>
    nock(ENVIRONMENT_VARIABLES.COMPANIES_HOUSE_URL).get(companiesHousePath);
});
