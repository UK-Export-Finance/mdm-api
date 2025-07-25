import getCompanyCompaniesHouseResponse from '@ukef/helper-modules/companies-house/examples/example-response-for-get-company-by-registration-number.json';
import getCompanyCompaniesHouseOverseasCompanyResponse from '@ukef/helper-modules/companies-house/examples/example-response-for-get-company-by-registration-number-overseas-company.json';
import getCompanyResponse from '@ukef/modules/companies/examples/example-response-for-get-company-by-registration-number.json';
import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';
import { GetCompanyGenerator } from '@ukef-test/support/generator/get-company-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import nock from 'nock';

describe('GET /companies?registrationNumber=', () => {
  let api: Api;

  const valueGenerator = new RandomValueGenerator();

  const {
    companiesHousePath,
    mdmPath,
    getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse,
    getCompanyCompaniesHouseInvalidAuthorizationResponse,
    getCompanyCompaniesHouseNotFoundResponse,
  } = new GetCompanyGenerator(valueGenerator).generate({
    numberToGenerate: 1,
    registrationNumber: '00000001',
  });

  const getCompaniesHousePath = (registrationNumber: string) => `/company/${registrationNumber}`;
  const getMdmPath = (registrationNumber: string) => `/api/v1/companies?registrationNumber=${encodeURIComponent(registrationNumber)}`;

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
      requestToGetCompanyByRegistrationNumber(companiesHousePath).reply(200, getCompanyCompaniesHouseResponse);
    },
    makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) => api.getWithoutAuth(mdmPath, incorrectAuth?.headerName, incorrectAuth?.headerValue),
  });

  it('returns a 200 response with the company when returned by Companies House API', async () => {
    requestToGetCompanyByRegistrationNumber(companiesHousePath).reply(200, getCompanyCompaniesHouseResponse);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(200);
    expect(body).toStrictEqual(getCompanyResponse);
  });

  it.each([
    {
      descriptionForTestName: 'too short',
      registrationNumber: valueGenerator.stringOfNumericCharacters({ length: 7 }),
      validationError: 'registrationNumber must be longer than or equal to 8 characters',
    },
    {
      descriptionForTestName: 'too long',
      registrationNumber: valueGenerator.stringOfNumericCharacters({ length: 9 }),
      validationError: 'registrationNumber must be shorter than or equal to 8 characters',
    },
    {
      descriptionForTestName: 'in the wrong format',
      registrationNumber: '0A000001',
      validationError: 'registrationNumber must match /^(([A-Z]{2}|[A-Z]\\d|\\d{2})(\\d{6}|\\d{5}[A-Z]))$/ regular expression',
    },
    {
      descriptionForTestName: 'the empty string',
      registrationNumber: '',
      validationError: 'registrationNumber must be longer than or equal to 8 characters',
    },
    {
      descriptionForTestName: 'all spaces',
      registrationNumber: '        ',
      validationError: 'registrationNumber must match /^(([A-Z]{2}|[A-Z]\\d|\\d{2})(\\d{6}|\\d{5}[A-Z]))$/ regular expression',
    },
  ])(
    'returns a 400 response with the correct validation errors if the registration number is $descriptionForTestName',
    async ({ registrationNumber, validationError }) => {
      // Act
      const { status, body } = await api.get(getMdmPath(registrationNumber));

      // Assert
      expect(status).toBe(400);
      expect(body).toMatchObject({
        error: 'Bad Request',
        message: expect.arrayContaining([validationError]),
        statusCode: 400,
      });
    },
  );

  it(`returns a 404 response if the Companies House API returns a 404 response status code`, async () => {
    // Arrange
    requestToGetCompanyByRegistrationNumber(companiesHousePath).reply(404, getCompanyCompaniesHouseNotFoundResponse);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(404);
    expect(body).toStrictEqual({
      statusCode: 404,
      message: 'Not found',
    });
  });

  it('returns a 422 response if the Companies House API returns an overseas company', async () => {
    // Arrange
    const registrationNumber = 'OE006930';

    requestToGetCompanyByRegistrationNumber(getCompaniesHousePath(registrationNumber)).reply(200, getCompanyCompaniesHouseOverseasCompanyResponse);

    // Act
    const { status, body } = await api.get(getMdmPath(registrationNumber));

    // Assert
    expect(status).toBe(422);
    expect(body).toStrictEqual({
      statusCode: 422,
      message: 'Unprocessable entity',
    });
  });

  it(`returns a 500 response if the Companies House API returns a 400 response containing the error string 'Invalid Authorization header'`, async () => {
    // Arrange
    requestToGetCompanyByRegistrationNumber(companiesHousePath).reply(400, getCompanyCompaniesHouseMalformedAuthorizationHeaderResponse);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(500);
    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it(`returns a 500 response if the Companies House API returns a 401 response containing the error string 'Invalid Authorization'`, async () => {
    // Arrange
    requestToGetCompanyByRegistrationNumber(companiesHousePath).reply(401, getCompanyCompaniesHouseInvalidAuthorizationResponse);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(500);
    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('returns a 500 response if the request to the Companies House API returns a 500 status code', async () => {
    // Arrange
    requestToGetCompanyByRegistrationNumber(companiesHousePath).reply(500, getCompanyCompaniesHouseResponse);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(500);
    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it('returns a 500 response if the request to the Companies House API returns an unhandled error response', async () => {
    // Arrange
    requestToGetCompanyByRegistrationNumber(companiesHousePath).reply(418, `I'm a teapot`);

    // Act
    const { status, body } = await api.get(mdmPath);

    // Assert
    expect(status).toBe(500);
    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  const requestToGetCompanyByRegistrationNumber = (companiesHousePath: string): nock.Interceptor =>
    nock(ENVIRONMENT_VARIABLES.COMPANIES_HOUSE_URL).get(companiesHousePath);
});
