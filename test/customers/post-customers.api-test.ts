import { EXAMPLES } from '@ukef/constants';
import { salesforceFormattedCurrentDate } from '@ukef/helpers/date-formatter.helper';
import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
import {
  accountSoql,
  legacySoql,
  mockSalesforceQuery,
  mockSalesforceLegacyQuery,
  SALESFORCE_ACCOUNT_RECORD,
  LEGACY_ACCOUNT_RECORD,
  setSalesforceTestEnvironment,
  SALESFORCE_TEST_ORIGIN,
} from '@ukef-test/support/salesforce';
import { HttpStatusCode } from 'axios';
import nock from 'nock';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';

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
  let restoreSalesforceEnvironment: () => void;

  const customerPayload = {
    companyRegistrationNumber: EXAMPLES.CUSTOMER.COMPANYREG,
    companyName: EXAMPLES.CUSTOMER.NAME,
    probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
    ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
    ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
    ukefSectorName: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
  };
  const accountQuery = accountSoql(`Company_Registration_Number__c = '${EXAMPLES.CUSTOMER.COMPANYREG}'`);

  const legacyAccountQuery = legacySoql(`M2_1_MCD_Company_Reg_Number__c = '${EXAMPLES.CUSTOMER.COMPANYREG}'`);

  beforeAll(async () => {
    restoreSalesforceEnvironment = setSalesforceTestEnvironment();
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
    restoreSalesforceEnvironment();
  });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });

  // Authorisation test cases
  withClientAuthenticationTests({
    givenTheRequestWouldOtherwiseSucceed: () => {
      mockSalesforceQuery(accountQuery, [SALESFORCE_ACCOUNT_RECORD]);
    },
    makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) =>
      api.postWithoutAuth(url, customerPayload, incorrectAuth?.headerName, incorrectAuth?.headerValue),
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
    mockSalesforceQuery(accountQuery, [SALESFORCE_ACCOUNT_RECORD]);

    // Act
    const { status, body } = await api.post(url, customerPayload);

    // Assert
    // Following response is sent when the customer exist
    expect(status).toBe(HttpStatusCode.Ok);
    expect(body).toHaveLength(1);
    expect(body).toStrictEqual([
      {
        partyUrn: '00302069',
        name: 'Mock name',
        sfId: '000A000000a1BBbCDE',
        companyRegNo: '06012345',
        probabilityOfDefault: 14.1,
        ukEntity: 'Yes',
        ukefIndustryName: 'AGRICULTURE, HORTICULTURE & FISHERIES',
        ukefSectorName: 'CIVIL: AGRICULTURE, HORTICULTURE & FISHERIES',
        type: 'Association',
        subtype: 'Alternative Finance Provider',
        isLegacyRecord: false,
        riskEntity: 'Yes',
        creditClassificationStatus: 'Good',
        creditClassificationDate: '1989-09-20',
      },
    ]);
    expect(nock.isDone()).toBe(true);
  });

  it(`should return ${HttpStatusCode.Created} when creating a customer with a legacy party URN`, async () => {
    // Arrange
    mockSalesforceQuery(accountQuery, []);
    mockSalesforceLegacyQuery(legacyAccountQuery, [LEGACY_ACCOUNT_RECORD]);

    nock(ENVIRONMENT_VARIABLES.DUN_AND_BRADSTREET_URL).post('/v3/token').reply(HttpStatusCode.Ok, { access_token: 'mock-access-token' });

    nock(ENVIRONMENT_VARIABLES.DUN_AND_BRADSTREET_URL)
      .get('/v1/match/cleanseMatch')
      .query({ countryISOAlpha2Code: 'GB', registrationNumber: EXAMPLES.CUSTOMER.COMPANYREG })
      .reply(HttpStatusCode.Ok, {
        matchCandidates: [{ organization: { duns: '123456789' } }],
      });

    nock(SALESFORCE_TEST_ORIGIN).post('/services/oauth2/token').reply(HttpStatusCode.Ok, { access_token: 'TEST_SALESFORCE_ACCESS_TOKEN' });

    nock(SALESFORCE_TEST_ORIGIN).post('/services/data/v53.0/sobjects/Account').reply(HttpStatusCode.Created, {
      id: '000A000000a1BBbCDE',
      success: true,
      errors: [],
    });

    // Act
    const { status, body } = await api.post(url, customerPayload);

    // Assert
    expect(status).toBe(HttpStatusCode.Created);
    expect(body).toStrictEqual([
      {
        partyUrn: '00302069',
        name: EXAMPLES.CUSTOMER.NAME,
        sfId: '000A000000a1BBbCDE',
        companyRegNo: EXAMPLES.CUSTOMER.COMPANYREG,
        creditClassificationDate: salesforceFormattedCurrentDate(),
        creditClassificationStatus: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
        isLegacyRecord: true,
        probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
        riskEntity: EXAMPLES.CUSTOMER.RISK_ENTITY.CORPORATE,
        subtype: null,
        type: null,
        ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
        ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
        ukefSectorName: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
      },
    ]);
    expect(nock.isDone()).toBe(true);
  });
});
