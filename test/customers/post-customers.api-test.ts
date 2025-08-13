import { EXAMPLES } from '@ukef/constants';
import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { HttpStatusCode } from 'axios';
import nock from 'nock';

const url = '/api/v1/customers';

const invalidPayloads = [
  {
    payload: {},
    message: [
      'companyRegistrationNumber must be shorter than or equal to 10 characters',
      'companyRegistrationNumber must be longer than or equal to 8 characters',
      'companyRegistrationNumber should not be empty',
      'companyRegistrationNumber must be a string',
      'companyName should not be empty',
      'companyName must be a string',
    ],
  },
  {
    payload: {
      companyRegistrationNumber: '',
    },
    message: [
      'companyRegistrationNumber must be longer than or equal to 8 characters',
      'companyRegistrationNumber should not be empty',
      'companyName should not be empty',
      'companyName must be a string',
    ],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
    },
    message: ['companyName should not be empty', 'companyName must be a string'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: '',
    },
    message: ['companyName should not be empty'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      probabilityOfDefault: '',
    },
    message: [
      'probabilityOfDefault must not be greater than 100',
      'probabilityOfDefault must not be less than 0',
      'probabilityOfDefault should not be empty',
      'probabilityOfDefault must be a number conforming to the specified constraints',
    ],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      probabilityOfDefault: 101,
    },
    message: ['probabilityOfDefault must not be greater than 100'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: '',
    },
    message: ['ukEntity must be longer than or equal to 1 characters', 'ukEntity should not be empty'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: 'False',
    },
    message: ['ukEntity must be shorter than or equal to 3 characters'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
      ukefIndustryName: '',
    },
    message: ['ukefIndustryName must be longer than or equal to 1 characters', 'ukefIndustryName should not be empty'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
      ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
      ukefSectorName: '',
    },
    message: ['ukefSectorName must be longer than or equal to 1 characters', 'ukefSectorName should not be empty'],
  },
];

describe('POST /customers', () => {
  let api: Api;

  const valueGenerator = new RandomValueGenerator();
  const basicAuth = Buffer.from(`${ENVIRONMENT_VARIABLES.APIM_INFORMATICA_USERNAME}:${ENVIRONMENT_VARIABLES.APIM_INFORMATICA_PASSWORD}`).toString('base64');
  const requestToGetCustomers = (informaticaPath: string): nock.Interceptor =>
    nock(ENVIRONMENT_VARIABLES.APIM_INFORMATICA_URL).get(informaticaPath).matchHeader('authorization', `Basic ${basicAuth}`);

  const { mdmPath, getCustomersResponse } = new GetCustomersGenerator(valueGenerator).generate({
    numberToGenerate: 1,
    query: { companyReg: EXAMPLES.CUSTOMER.COMPANYREG },
  });

  requestToGetCustomers(`/account?companyreg=${EXAMPLES.CUSTOMER.COMPANYREG}`).reply(HttpStatusCode.Ok, getCustomersResponse[0]);

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  // Authorisation test cases
  withClientAuthenticationTests({
    givenTheRequestWouldOtherwiseSucceed: () => {
      requestToGetCustomers(mdmPath).reply(HttpStatusCode.Ok, getCustomersResponse[0]);
    },
    makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) => api.getWithoutAuth(mdmPath, incorrectAuth?.headerName, incorrectAuth?.headerValue),
  });

  // Bad request test cases
  it.each(invalidPayloads)(`should return ${HttpStatusCode.BadRequest} for a malformed payload`, async ({ payload, message }) => {
    // Act
    const { status, body } = await api.post(url, payload);

    // Assert
    expect(status).toBe(HttpStatusCode.BadRequest);
    expect(body.error).toBe('Bad Request');
    expect(body.message).toStrictEqual(message);
  });

  // Good request test case
  it(`should return ${HttpStatusCode.Ok} for a correct payload, when creating an existing customer`, async () => {
    // Arrange
    const payload = {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
      ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
      ukefSectorName: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
    };

    // Act
    const { status, body } = await api.post(url, payload);

    // Assert
    // Following response is sent when the customer exist
    expect(status).toBe(HttpStatusCode.Ok);
    expect(body).toHaveLength(1);
    expect(body[0].companyRegNo).toBeDefined();
    expect(body[0].name).toBeDefined();
    expect(body[0].partyUrn).toBeDefined();
    expect(body[0].sfId).toBeDefined();
    expect(body[0].type).toBeDefined();
    expect(body[0].subtype).toBeDefined();
    expect(body[0].isLegacyRecord).toBeDefined();
  });
});
