import { HttpStatusCode } from 'axios';
import nock from 'nock';
import { EXAMPLES } from '@ukef/constants';
import { salesforceFormattedCurrentDate } from '@ukef/helpers/date-formatter.helper';
import { GetCustomersInformaticaResponseItem } from '@ukef/modules/informatica/dto/get-customers-informatica-response.dto';
import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';
import { GetCustomersGenerator } from '@ukef-test/support/generator/get-customers-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

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
      customerType: 'a'.repeat(201),
    },
    message: ['customerType must be shorter than or equal to 200 characters'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
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
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      probabilityOfDefault: 101,
    },
    message: ['probabilityOfDefault must not be greater than 100'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: '',
    },
    message: ['ukEntity should not be empty'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: 'False',
    },
    message: ['ukEntity must be shorter than or equal to 3 characters'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
      ukefIndustryName: '',
    },
    message: ['ukefIndustryName should not be empty'],
  },
  {
    payload: {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
      ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
      ukefSectorName: '',
    },
    message: ['ukefSectorName should not be empty'],
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

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  withClientAuthenticationTests({
    givenTheRequestWouldOtherwiseSucceed: () => {
      requestToGetCustomers(mdmPath).reply(HttpStatusCode.Ok, getCustomersResponse[0]);
    },
    makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) => api.getWithoutAuth(mdmPath, incorrectAuth?.headerName, incorrectAuth?.headerValue),
  });

  it.each(invalidPayloads)(`should return ${HttpStatusCode.BadRequest} for a malformed payload`, async ({ payload, message }) => {
    // Act
    const { status, body } = await api.post(url, payload);

    // Assert
    expect(status).toBe(HttpStatusCode.BadRequest);
    expect(body.error).toBe('Bad Request');
    expect(body.message).toStrictEqual(message);
  });

  it(`should return ${HttpStatusCode.Ok} for a correct payload, when creating an existing customer`, async () => {
    // Arrange
    const payload = {
      companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
      companyName: EXAMPLES.CUSTOMER.NAME,
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
      ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
      ukefSectorName: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
    };

    requestToGetCustomers(`/v1/p-sa-impl-get-account-or-legacy?companyreg=${EXAMPLES.CUSTOMER.COMPANYREG}`).reply(HttpStatusCode.Ok, getCustomersResponse[0]);

    // Act
    const { status, body } = await api.post(url, payload);

    // Assert
    expect(status).toBe(HttpStatusCode.Ok);
    expect(body).toHaveLength(1);

    const [customer] = body;

    expect(typeof customer.companyRegNo).toBe('string');
    expect(typeof customer.customerType).toBe('string');
    expect(typeof customer.name).toBe('string');
    expect(typeof customer.partyUrn).toBe('string');
    expect(typeof customer.sfId).toBe('string');
    expect(typeof customer.type).toBe('object');
    expect(typeof customer.subtype).toBe('object');
    expect(typeof customer.isLegacyRecord).toBe('boolean');

    // Optional fields - verify they exist in the response structure
    expect(customer).toHaveProperty('creditClassificationDate');
    expect(customer).toHaveProperty('creditClassificationStatus');
    expect(customer).toHaveProperty('probabilityOfDefault');
    expect(customer).toHaveProperty('riskEntity');
    expect(customer).toHaveProperty('ukEntity');
    expect(customer).toHaveProperty('ukefIndustryName');
    expect(customer).toHaveProperty('ukefSectorName');
  });

  it(`should return ${HttpStatusCode.Created} for a correct payload, when creating a new customer in Salesforce using an existing legacy party URN`, async () => {
    // Arrange
    const legacyCompanyRegistrationNumber = '07654321';

    const payload = {
      companyRegistrationNumber: legacyCompanyRegistrationNumber,
      companyName: EXAMPLES.CUSTOMER.NAME,
      customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
      probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
      ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
      ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
      ukefSectorName: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
    };

    const existingLegacyCustomer: GetCustomersInformaticaResponseItem[] = [
      {
        companyRegNo: legacyCompanyRegistrationNumber,
        isLegacyRecord: true,
        name: EXAMPLES.CUSTOMER.NAME,
        partyUrn: EXAMPLES.CUSTOMER.PARTYURN,
        sfId: EXAMPLES.CUSTOMER.SALESFORCE_ID,
        subtype: null,
        type: null,
      },
    ];

    requestToGetCustomers(`/v1/p-sa-impl-get-account-or-legacy?companyreg=${legacyCompanyRegistrationNumber}`).reply(HttpStatusCode.Ok, existingLegacyCustomer);

    /**
     * Dun & Bradstreet is always consulted for a DUNS number before creating a customer in Salesforce, even when an
     * existing legacy party URN means the Numbers service does not need to be called to generate a new one.
     */
    nock(ENVIRONMENT_VARIABLES.DUN_AND_BRADSTREET_URL).post('/v3/token').reply(HttpStatusCode.Ok, { access_token: 'test-dun-and-bradstreet-access-token' });

    nock(ENVIRONMENT_VARIABLES.DUN_AND_BRADSTREET_URL)
      .get(`/v1/match/cleanseMatch?countryISOAlpha2Code=GB&registrationNumber=${legacyCompanyRegistrationNumber}`)
      .reply(HttpStatusCode.Ok, { matchCandidates: [{ organization: { duns: EXAMPLES.CUSTOMER.DNB_NUMBER } }] });

    /**
     * Salesforce's access token endpoint is configured as a standalone absolute URL (rather than a path relative to
     * Salesforce's base URL), so the mock is scoped to its own origin and path.
     */
    const salesforceAccessUrl = new URL(ENVIRONMENT_VARIABLES.SALESFORCE_ACCESS_URL);

    nock(salesforceAccessUrl.origin)
      .post(`${salesforceAccessUrl.pathname}${salesforceAccessUrl.search}`)
      .reply(HttpStatusCode.Ok, { access_token: 'test-salesforce-access-token' });

    nock(ENVIRONMENT_VARIABLES.SALESFORCE_INSTANCE_URL)
      .post('/sobjects/Account')
      .reply(HttpStatusCode.Ok, { id: EXAMPLES.CUSTOMER.SALESFORCE_ID, success: true, errors: [] });

    // Act
    const { status, body } = await api.post(url, payload);

    // Assert
    expect(status).toBe(HttpStatusCode.Created);
    expect(body).toHaveLength(1);

    const expected = [
      {
        companyRegNo: legacyCompanyRegistrationNumber,
        creditClassificationDate: salesforceFormattedCurrentDate(),
        creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
        customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
        isLegacyRecord: true,
        name: EXAMPLES.CUSTOMER.NAME,
        partyUrn: EXAMPLES.CUSTOMER.PARTYURN,
        probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
        riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
        sfId: EXAMPLES.CUSTOMER.SALESFORCE_ID,
        subtype: null,
        type: null,
        ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
        ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
        ukefSectorName: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
      },
    ];

    expect(body).toEqual(expected);
  });
});
