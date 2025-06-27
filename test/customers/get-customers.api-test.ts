import { CUSTOMERS, ENUMS } from '@ukef/constants';
import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import nock from 'nock';

describe('GET /customers/:urn', () => {
  const valueGenerator = new RandomValueGenerator();

  let api: Api;

  const { mdmPath, informaticaPath, getCustomersResponse } = new GetCustomersGenerator(valueGenerator).generate({
    numberToGenerate: 1,
  });

  const getMdmUrl = (query: { [key: string]: any }) => '/api/v1/customers?' + new URLSearchParams(query as URLSearchParams).toString();

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

  withClientAuthenticationTests({
    givenTheRequestWouldOtherwiseSucceed: () => {
      requestToGetCustomers(mdmPath).reply(200, getCustomersResponse[0]);
    },
    makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) => api.getWithoutAuth(mdmPath, incorrectAuth?.headerName, incorrectAuth?.headerValue),
  });

  it('returns a 200 response with the customers if they are returned by Informatica', async () => {
    // Arrange
    requestToGetCustomers(informaticaPath).reply(200, getCustomersResponse[0]);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(200);

    expect(body).toStrictEqual(getCustomersResponse[0]);
  });

  it.each([
    {
      query: { name: CUSTOMERS.EXAMPLES.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
    },
    {
      query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
    },
    {
      query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
    },
    {
      query: { name: CUSTOMERS.EXAMPLES.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
    },
    {
      query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
    },
    {
      query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
    },
    {
      query: { name: CUSTOMERS.EXAMPLES.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
    },
    {
      query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
    },
    {
      query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
    },
    {
      query: { name: CUSTOMERS.EXAMPLES.NAME },
    },
    {
      query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG },
    },
    {
      query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN },
    },
  ])('returns a 200 response with the customers if query is "$query"', async ({ query }) => {
    // Arrange
    const { mdmPath, informaticaPath, getCustomersResponse } = new GetCustomersGenerator(valueGenerator).generate({
      numberToGenerate: 1,
      query,
    });

    requestToGetCustomers(informaticaPath).reply(200, getCustomersResponse[0]);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(200);

    expect(body).toStrictEqual(getCustomersResponse[0]);
  });

  it('returns a 404 response if Informatica returns a 404 response with the string "null"', async () => {
    // Arrange
    requestToGetCustomers(informaticaPath).reply(404, [
      {
        errorCode: '404',
        errorDateTime: '2023-06-30T13:41:33Z',
        errorMessage: 'Company registration not found',
        errorDescription: 'Party details request for the requested company registration not found.',
      },
    ]);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(404);

    expect(body).toStrictEqual({
      statusCode: 404,
      message: 'Customer not found.',
    });
  });

  it('returns a 500 response if Informatica returns a status code that is NOT 200', async () => {
    // Arrange
    requestToGetCustomers(informaticaPath).reply(401);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(500);

    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('returns a 500 response if getting the facility investors from ACBS returns a 500 status code', async () => {
    // Arrange
    requestToGetCustomers(informaticaPath).reply(500, getCustomersResponse[0]);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(500);

    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it.each([
    {
      query: { name: valueGenerator.string({ length: 1 }) },
      expectedError: 'name must be longer than or equal to 2 characters',
    },
    {
      query: { name: valueGenerator.string({ length: 256 }) },
      expectedError: 'name must be shorter than or equal to 255 characters',
    },
    {
      query: { companyReg: valueGenerator.string({ length: 7 }) },
      expectedError: 'companyReg must be longer than or equal to 8 characters',
    },
    {
      query: { companyReg: valueGenerator.string({ length: 11 }) },
      expectedError: 'companyReg must be shorter than or equal to 10 characters',
    },
    {
      query: { partyUrn: valueGenerator.stringOfNumericCharacters({ length: 7 }) },
      expectedError: 'partyUrn must match /^\\d{8}$/ regular expression',
    },
    {
      query: { partyUrn: valueGenerator.stringOfNumericCharacters({ length: 9 }) },
      expectedError: 'partyUrn must match /^\\d{8}$/ regular expression',
    },
    {
      query: { partyUrn: valueGenerator.word() },
      expectedError: 'partyUrn must match /^\\d{8}$/ regular expression',
    },
  ])('returns a 400 response with error array if query is "$query"', async ({ query, expectedError }) => {
    // Act
    const { status, body } = await api.get(getMdmUrl(query));

    // Assert
    expect(status).toBe(400);

    expect(body).toMatchObject({
      error: 'Bad Request',
      message: expect.arrayContaining([expectedError]),
      statusCode: 400,
    });
  });

  it.each([
    {
      query: {},
      expectedError: 'One and just one search parameter is required',
    },
    {
      query: { name: valueGenerator.word(), companyReg: valueGenerator.string({ length: 8 }) },
      expectedError: 'One and just one search parameter is required',
    },
  ])('returns a 400 response with error string if query is "$query"', async ({ query, expectedError }) => {
    // Act
    const { status, body } = await api.get(getMdmUrl(query));

    // Assert
    expect(status).toBe(400);

    expect(body).toMatchObject({
      error: 'Bad Request',
      message: expectedError,
      statusCode: 400,
    });
  });

  const basicAuth = Buffer.from(`${ENVIRONMENT_VARIABLES.APIM_INFORMATICA_USERNAME}:${ENVIRONMENT_VARIABLES.APIM_INFORMATICA_PASSWORD}`).toString('base64');

  const requestToGetCustomers = (informaticaPath: string): nock.Interceptor =>
    nock(ENVIRONMENT_VARIABLES.APIM_INFORMATICA_URL).get(informaticaPath).matchHeader('authorization', `Basic ${basicAuth}`);
});
