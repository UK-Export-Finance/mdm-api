// import { CUSTOMERS, ENUMS } from '@ukef/constants';
// import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
// import { ENVIRONMENT_VARIABLES, TIME_EXCEEDING_INFORMATICA_TIMEOUT } from '@ukef-test/support/environment-variables';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';
import { GetGeospatialAddressesGenerator } from '@ukef-test/support/generator/get-geospatial-addresses-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import nock from 'nock';

describe('GET /geospatial/addresses/postcode?postcode=', () => {
  const valueGenerator = new RandomValueGenerator();

  let api: Api;

  const { ordnanceSurveyPath, mdmPath, getAddressesByPostcodeResponse, getAddressOrdnanceSurveyResponse } = new GetGeospatialAddressesGenerator(
    valueGenerator,
  ).generate({
    numberToGenerate: 2,
  });

  // const getMdmUrl = (postcode: string) => `/api/v1/geospatial/addresses/postcode?postcode=${encodeURIComponent(postcode)}`;

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

  // withClientAuthenticationTests({
  //   givenTheRequestWouldOtherwiseSucceed: () => {
  //     requestToGetCustomers(mdmPath[0]).reply(200, getAddressesByPostcodeResponse[0]);
  //   },
  //   makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) => api.getWithoutAuth(mdmPath[0], incorrectAuth?.headerName, incorrectAuth?.headerValue),
  // });

  it.only('returns a 200 response with the customers if they are returned by Informatica', async () => {
    requestToGetCustomers(ordnanceSurveyPath[0]).reply(200, getAddressOrdnanceSurveyResponse[0]);

    const { status, body } = await api.get(mdmPath[0]);

    expect(status).toBe(200);
    expect(body).toStrictEqual(getAddressesByPostcodeResponse[0]);
  });

  // it.each([
  //   {
  //     query: { name: CUSTOMERS.EXAMPLES.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
  //   },
  //   {
  //     query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
  //   },
  //   {
  //     query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES },
  //   },
  //   {
  //     query: { name: CUSTOMERS.EXAMPLES.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
  //   },
  //   {
  //     query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
  //   },
  //   {
  //     query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.NO },
  //   },
  //   {
  //     query: { name: CUSTOMERS.EXAMPLES.NAME, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
  //   },
  //   {
  //     query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
  //   },
  //   {
  //     query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN, fallbackToLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.LEGACY_ONLY },
  //   },
  //   {
  //     query: { name: CUSTOMERS.EXAMPLES.NAME },
  //   },
  //   {
  //     query: { companyReg: CUSTOMERS.EXAMPLES.COMPANYREG },
  //   },
  //   {
  //     query: { partyUrn: CUSTOMERS.EXAMPLES.PARTYURN },
  //   },
  // ])('returns a 200 response with the customers if query is "$query"', async ({ query }) => {
  //   const { mdmPath, informaticaPath, getCustomersResponse } = new GetCustomersGenerator(valueGenerator).generate({
  //     numberToGenerate: 1,
  //     query,
  //   });
  //   requestToGetCustomers(informaticaPath).reply(200, getCustomersResponse[0]);

  //   const { status, body } = await api.get(mdmPath);

  //   expect(status).toBe(200);
  //   expect(body).toStrictEqual(getCustomersResponse[0]);
  // });

  // it('returns a 404 response if Informatica returns a 404 response with the string "null"', async () => {
  //   requestToGetCustomers(informaticaPath).reply(404, [
  //     {
  //       errorCode: '404',
  //       errorDateTime: '2023-06-30T13:41:33Z',
  //       errorMessage: 'Company registration not found',
  //       errorDescription: 'Party details request for the requested company registration not found.',
  //     },
  //   ]);

  //   const { status, body } = await api.get(mdmPath);

  //   expect(status).toBe(404);
  //   expect(body).toStrictEqual({
  //     statusCode: 404,
  //     message: 'Customer not found.',
  //   });
  // });

  // it('returns a 500 response if Informatica returns a status code that is NOT 200', async () => {
  //   requestToGetCustomers(informaticaPath).reply(401);

  //   const { status, body } = await api.get(mdmPath);

  //   expect(status).toBe(500);
  //   expect(body).toStrictEqual({
  //     statusCode: 500,
  //     message: 'Internal server error',
  //   });
  // });

  // it('returns a 500 response if getting the facility investors from ACBS times out', async () => {
  //   requestToGetCustomers(informaticaPath).delay(TIME_EXCEEDING_INFORMATICA_TIMEOUT).reply(200, getCustomersResponse[0]);

  //   const { status, body } = await api.get(mdmPath);

  //   expect(status).toBe(500);
  //   expect(body).toStrictEqual({
  //     statusCode: 500,
  //     message: 'Internal server error',
  //   });
  // });

  // it.each([
  //   {
  //     query: { name: valueGenerator.string({ length: 1 }) },
  //     expectedError: 'name must be longer than or equal to 2 characters',
  //   },
  //   {
  //     query: { name: valueGenerator.string({ length: 256 }) },
  //     expectedError: 'name must be shorter than or equal to 255 characters',
  //   },
  //   {
  //     query: { name: valueGenerator.word(), extraParameter: valueGenerator.word() },
  //     expectedError: 'property extraParameter should not exist',
  //   },
  //   {
  //     query: { companyReg: valueGenerator.string({ length: 7 }) },
  //     expectedError: 'companyReg must be longer than or equal to 8 characters',
  //   },
  //   {
  //     query: { companyReg: valueGenerator.string({ length: 11 }) },
  //     expectedError: 'companyReg must be shorter than or equal to 10 characters',
  //   },
  //   {
  //     query: { partyUrn: valueGenerator.stringOfNumericCharacters({ length: 7 }) },
  //     expectedError: 'partyUrn must match /^\\d{8}$/ regular expression',
  //   },
  //   {
  //     query: { partyUrn: valueGenerator.stringOfNumericCharacters({ length: 9 }) },
  //     expectedError: 'partyUrn must match /^\\d{8}$/ regular expression',
  //   },
  //   {
  //     query: { partyUrn: valueGenerator.word() },
  //     expectedError: 'partyUrn must match /^\\d{8}$/ regular expression',
  //   },
  // ])('returns a 400 response with error array if query is "$query"', async ({ query, expectedError }) => {
  //   const { status, body } = await api.get(getMdmUrl(query));

  //   expect(status).toBe(400);
  //   expect(body).toMatchObject({
  //     error: 'Bad Request',
  //     message: expect.arrayContaining([expectedError]),
  //     statusCode: 400,
  //   });
  // });

  // it.each([
  //   {
  //     query: {},
  //     expectedError: 'One and just one search parameter is required',
  //   },
  //   {
  //     query: { name: valueGenerator.word(), companyReg: valueGenerator.string({ length: 8 }) },
  //     expectedError: 'One and just one search parameter is required',
  //   },
  // ])('returns a 400 response with error string if query is "$query"', async ({ query, expectedError }) => {
  //   const { status, body } = await api.get(getMdmUrl(query));

  //   expect(status).toBe(400);
  //   expect(body).toMatchObject({
  //     error: 'Bad Request',
  //     message: expectedError,
  //     statusCode: 400,
  //   });
  // });

  const basicAuth = Buffer.from(`${ENVIRONMENT_VARIABLES.APIM_INFORMATICA_USERNAME}:${ENVIRONMENT_VARIABLES.APIM_INFORMATICA_PASSWORD}`).toString('base64');

  const requestToGetCustomers = (informaticaPath: string): nock.Interceptor =>
    nock(ENVIRONMENT_VARIABLES.APIM_INFORMATICA_URL).get(informaticaPath).matchHeader('authorization', `Basic ${basicAuth}`);
});
