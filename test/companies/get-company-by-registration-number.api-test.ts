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

  const getMdmUrl = (registrationNumber: string) => `/api/v1/companies?registrationNumber=${encodeURIComponent(registrationNumber)}`;

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

  it.each([
    {
      registrationNumber: valueGenerator.stringOfNumericCharacters({ length: 6 }),
      validationError: 'registrationNumber must be longer than or equal to 7 characters',
    },
    {
      registrationNumber: valueGenerator.stringOfNumericCharacters({ length: 9 }),
      validationError: 'registrationNumber must be shorter than or equal to 8 characters',
    },
    {
      registrationNumber: '0A000001',
      validationError: 'registrationNumber must match /^(([A-Z]{2}|[A-Z]\\d|\\d{2})(\\d{5,6}|\\d{4,5}[A-Z]))$/ regular expression',
    },
  ])(`returns a 400 response with validation errors if postcode is '$registrationNumber'`, async ({ registrationNumber, validationError }) => {
    const { status, body } = await api.get(getMdmUrl(registrationNumber));

    expect(status).toBe(400);
    expect(body).toMatchObject({
      error: 'Bad Request',
      message: expect.arrayContaining([validationError]),
      statusCode: 400,
    });
  });

  const requestToGetCompanyByRegistrationNumber = (companiesHousePath: string): nock.Interceptor =>
    nock(ENVIRONMENT_VARIABLES.COMPANIES_HOUSE_URL).get(companiesHousePath);
});
