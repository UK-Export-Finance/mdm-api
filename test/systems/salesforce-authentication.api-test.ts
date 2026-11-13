import { HttpStatusCode } from 'axios';
import nock from 'nock';
import { EXAMPLES } from '@ukef/constants';
import { Api } from '@ukef-test/support/api';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';
import { accountSoql, SALESFORCE_ACCOUNT_RECORD } from '@ukef-test/support/salesforce';

const url = '/api/v1/customers';

describe('GET /customers - Salesforce authentication', () => {
  let api: Api;

  const companyRegistrationNumber = EXAMPLES.CUSTOMER.COMPANYREG;
  const salesforceAccessToken = 'test-salesforce-access-token';
  const salesforceAccessUrl = new URL(ENVIRONMENT_VARIABLES.SALESFORCE_ACCESS_URL);

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should authenticate with Salesforce using the OAuth 2.0 client credentials grant', async () => {
    // Arrange
    let salesforceAuthRequestBody: string;

    const salesforceAuthRequest = nock(salesforceAccessUrl.origin)
      .post(`${salesforceAccessUrl.pathname}${salesforceAccessUrl.search}`, (body) => {
        salesforceAuthRequestBody = typeof body === 'string' ? body : new URLSearchParams(body).toString();
        return true;
      })
      .matchHeader('content-type', 'application/x-www-form-urlencoded')
      .reply(HttpStatusCode.Ok, { access_token: salesforceAccessToken });

    const salesforceAccountQuery = nock(ENVIRONMENT_VARIABLES.SALESFORCE_INSTANCE_URL)
      .get('/query')
      .query({ q: accountSoql(`Company_Registration_Number__c = '${companyRegistrationNumber}'`) })
      .matchHeader('authorization', `Bearer ${salesforceAccessToken}`)
      .reply(HttpStatusCode.Ok, { records: [SALESFORCE_ACCOUNT_RECORD] });

    // Act
    const { status, body } = await api.get(`${url}?companyReg=${companyRegistrationNumber}&fallbackToLegacyData=no`);

    // Assert
    expect(status).toBe(HttpStatusCode.Ok);
    expect(body).toMatchObject([
      {
        companyRegNo: companyRegistrationNumber,
        isLegacyRecord: false,
        name: EXAMPLES.CUSTOMER.NAME,
        partyUrn: EXAMPLES.CUSTOMER.PARTYURN,
      },
    ]);
    expect(salesforceAuthRequest.isDone()).toBe(true);
    expect(salesforceAccountQuery.isDone()).toBe(true);

    const authParams = Object.fromEntries(new URLSearchParams(salesforceAuthRequestBody));

    expect(authParams).toStrictEqual({
      grant_type: 'client_credentials',
      client_id: ENVIRONMENT_VARIABLES.SALESFORCE_CLIENT_ID,
      client_secret: ENVIRONMENT_VARIABLES.SALESFORCE_CLIENT_SECRET,
    });
  });
});
