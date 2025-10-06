import { EXAMPLES, GEOSPATIAL } from '@ukef/constants';
import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';
import { GetGeospatialAddressesGenerator } from '@ukef-test/support/generator/get-geospatial-addresses-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import nock from 'nock';

describe('GET /geospatial/addresses/postcode?postcode=', () => {
  const valueGenerator = new RandomValueGenerator();

  let api: Api;

  const {
    ordnanceSurveyPaths,
    ordnanceSurveyKey,
    mdmPaths,
    getAddressesByPostcodeResponse,
    getAddressesByPostcodeMultipleResponse,
    getAddressesOrdnanceSurveyResponse,
    getAddressesOrdnanceSurveyEmptyResponse,
    getAddressesOrdnanceSurveyMultipleMatchingAddressesResponse,
    ordnanceSurveyAuthErrorResponse,
  } = new GetGeospatialAddressesGenerator(valueGenerator).generate({
    postcode: EXAMPLES.GEOSPATIAL.ENGLISH_POSTCODE,
    key: ENVIRONMENT_VARIABLES.ORDNANCE_SURVEY_KEY,
    numberToGenerate: 1,
  });

  const getMdmUrl = (postcode: any) => `/api/v1/geospatial/addresses/postcode?postcode=${encodeURIComponent(postcode)}`;
  const getOsUrl = (postcode: any) =>
    `/search/places/v1/postcode?postcode=${encodeURIComponent(postcode)}&lr=${GEOSPATIAL.DEFAULT.RESULT_LANGUAGE}&key=${encodeURIComponent(ordnanceSurveyKey)}`;

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
      requestToGetAddressesByPostcode(ordnanceSurveyPaths[0]).reply(200, getAddressesOrdnanceSurveyResponse[0]);
    },
    makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) => api.getWithoutAuth(mdmPaths[0], incorrectAuth?.headerName, incorrectAuth?.headerValue),
  });

  it.each([
    {
      postcode: EXAMPLES.GEOSPATIAL.ENGLISH_POSTCODE,
      description: 'for English postcode',
    },
    {
      postcode: EXAMPLES.GEOSPATIAL.NORTHERN_IRELAND_POSTCODE,
      description: 'for Northern Ireland postcode',
    },
    {
      postcode: EXAMPLES.GEOSPATIAL.SCOTLAND_POSTCODE,
      description: 'for Scottish postcode',
    },
    {
      postcode: EXAMPLES.GEOSPATIAL.WALES_POSTCODE,
      description: 'for Wales postcode',
    },
  ])('returns a 200 response $description', async ({ postcode }) => {
    // Arrange
    requestToGetAddressesByPostcode(getOsUrl(postcode)).reply(200, getAddressesOrdnanceSurveyResponse[0]);

    // Act
    const { status, body } = await api.get(getMdmUrl(postcode));

    // Assert
    expect(status).toBe(200);
    expect(body).toStrictEqual(getAddressesByPostcodeResponse[0]);
  });

  it('returns a 200 response with the addresses if they are returned by Ordnance Survey API', async () => {
    // Arrange
    requestToGetAddressesByPostcode(ordnanceSurveyPaths[0]).reply(200, getAddressesOrdnanceSurveyMultipleMatchingAddressesResponse);

    // Act
    const { status, body } = await api.get(mdmPaths[0]);

    // Assert
    expect(status).toBe(200);
    expect(body).toStrictEqual(getAddressesByPostcodeMultipleResponse);
  });

  it('returns a 404 response if Ordnance Survey API returns a 200 without results', async () => {
    // Arrange
    requestToGetAddressesByPostcode(ordnanceSurveyPaths[0]).reply(200, getAddressesOrdnanceSurveyEmptyResponse[0]);

    // Act
    const { status, body } = await api.get(mdmPaths[0]);

    // Assert
    expect(status).toBe(404);
    expect(body).toEqual({
      statusCode: 404,
      message: 'No addresses found',
      error: 'Not Found',
    });
  });

  it('returns a 500 response if Ordnance Survey API returns a status code 401', async () => {
    // Arrange
    requestToGetAddressesByPostcode(ordnanceSurveyPaths[0]).reply(401);

    // Act
    const { status, body } = await api.get(mdmPaths[0]);

    // Assert
    expect(status).toBe(500);
    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('returns a 500 response if Ordnance Survey API returns a status code 404', async () => {
    // Arrange
    requestToGetAddressesByPostcode(ordnanceSurveyPaths[0]).reply(404);

    // Act
    const { status, body } = await api.get(mdmPaths[0]);

    // Assert
    expect(status).toBe(500);
    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('returns a 500 response if Ordnance Survey API returns a 500 status code', async () => {
    // Arrange
    requestToGetAddressesByPostcode(ordnanceSurveyPaths[0]).reply(500, getAddressesOrdnanceSurveyResponse[0]);

    // Act
    const { status, body } = await api.get(mdmPaths[0]);

    // Assert
    expect(status).toBe(500);
    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('returns a 500 response if Ordnance Survey API returns error', async () => {
    // Arrange
    requestToGetAddressesByPostcode(ordnanceSurveyPaths[0]).reply(401, ordnanceSurveyAuthErrorResponse);

    // Act
    const { status, body } = await api.get(mdmPaths[0]);

    // Assert
    expect(status).toBe(500);
    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it.each([
    {
      postcode: false,
      expectedError: 'postcode must match /^[A-Za-z]{1,2}[\\dRr][\\dA-Za-z]?\\s?\\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/ regular expression',
    },
    {
      postcode: 1234567,
      expectedError: 'postcode must match /^[A-Za-z]{1,2}[\\dRr][\\dA-Za-z]?\\s?\\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/ regular expression',
    },
    {
      postcode: null,
      expectedError: 'postcode must match /^[A-Za-z]{1,2}[\\dRr][\\dA-Za-z]?\\s?\\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/ regular expression',
    },
    {
      postcode: {},
      expectedError: 'postcode must match /^[A-Za-z]{1,2}[\\dRr][\\dA-Za-z]?\\s?\\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/ regular expression',
    },
    {
      postcode: '',
      expectedError: 'postcode must be longer than or equal to 5 characters',
    },
    {
      postcode: valueGenerator.string({ length: 4 }),
      expectedError: 'postcode must be longer than or equal to 5 characters',
    },
    {
      postcode: valueGenerator.string({ length: 9 }),
      expectedError: 'postcode must be shorter than or equal to 8 characters',
    },
    {
      postcode: valueGenerator.stringOfNumericCharacters({ length: 5 }),
      expectedError: 'postcode must match /^[A-Za-z]{1,2}[\\dRr][\\dA-Za-z]?\\s?\\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/ regular expression',
    },
    {
      postcode: 'AA1 1CL',
      expectedError: 'postcode must match /^[A-Za-z]{1,2}[\\dRr][\\dA-Za-z]?\\s?\\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/ regular expression',
    },
    {
      postcode: 'SW1  2AQ',
      expectedError: 'postcode must match /^[A-Za-z]{1,2}[\\dRr][\\dA-Za-z]?\\s?\\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/ regular expression',
    },
  ])('returns a 400 response with error array if postcode is "$postcode"', async ({ postcode, expectedError }) => {
    // Act
    const { status, body } = await api.get(getMdmUrl(postcode));

    // Assert
    expect(status).toBe(400);
    expect(body).toMatchObject({
      error: 'Bad Request',
      message: expect.arrayContaining([expectedError]),
      statusCode: 400,
    });
  });

  const requestToGetAddressesByPostcode = (ordnanceSurveyPath: string): nock.Interceptor =>
    nock(ENVIRONMENT_VARIABLES.ORDNANCE_SURVEY_URL).get(ordnanceSurveyPath);
});
