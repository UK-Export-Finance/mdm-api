import { HttpStatusCode } from 'axios';
import nock from 'nock';
import { EXAMPLES } from '@ukef/constants';
import { GetCustomersInformaticaResponseItem } from '@ukef/modules/informatica/dto/get-customers-informatica-response.dto';
import { Api } from '@ukef-test/support/api';
import { ENVIRONMENT_VARIABLES } from '@ukef-test/support/environment-variables';

const url = '/api/v1/customers';

describe('POST /customers - Salesforce authentication', () => {
  let api: Api;

  const companyRegistrationNumber = '07654321';
  const salesforceAccessToken = 'test-salesforce-access-token';
  const salesforceAccessUrl = new URL(ENVIRONMENT_VARIABLES.SALESFORCE_ACCESS_URL);
  const basicAuth = Buffer.from(`${ENVIRONMENT_VARIABLES.APIM_INFORMATICA_USERNAME}:${ENVIRONMENT_VARIABLES.APIM_INFORMATICA_PASSWORD}`).toString('base64');

  const payload = {
    companyRegistrationNumber,
    companyName: EXAMPLES.CUSTOMER.NAME,
    customerType: EXAMPLES.CUSTOMER.CUSTOMER_TYPE,
    probabilityOfDefault: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
    ukEntity: EXAMPLES.CUSTOMER.UK_ENTITY,
    ukefIndustryName: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
    ukefSectorName: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
  };

  const existingLegacyCustomer: GetCustomersInformaticaResponseItem[] = [
    {
      companyRegNo: companyRegistrationNumber,
      isLegacyRecord: true,
      name: EXAMPLES.CUSTOMER.NAME,
      partyUrn: EXAMPLES.CUSTOMER.PARTYURN,
      sfId: EXAMPLES.CUSTOMER.SALESFORCE_ID,
      subtype: null,
      type: null,
    },
  ];

  beforeAll(async () => {
    api = await Api.create();
  });

  afterAll(async () => {
    await api.destroy();
  });

  beforeEach(() => {
    nock(ENVIRONMENT_VARIABLES.APIM_INFORMATICA_URL)
      .get(`/v1/p-sa-impl-get-account-or-legacy?companyreg=${companyRegistrationNumber}`)
      .matchHeader('authorization', `Basic ${basicAuth}`)
      .reply(HttpStatusCode.Ok, existingLegacyCustomer);

    nock(ENVIRONMENT_VARIABLES.DUN_AND_BRADSTREET_URL).post('/v3/token').reply(HttpStatusCode.Ok, { access_token: 'test-dun-and-bradstreet-access-token' });

    nock(ENVIRONMENT_VARIABLES.DUN_AND_BRADSTREET_URL)
      .get(`/v1/match/cleanseMatch?countryISOAlpha2Code=GB&registrationNumber=${companyRegistrationNumber}`)
      .reply(HttpStatusCode.Ok, { matchCandidates: [{ organization: { duns: EXAMPLES.CUSTOMER.DNB_NUMBER } }] });
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

    const salesforceCreateAccountRequest = nock(ENVIRONMENT_VARIABLES.SALESFORCE_INSTANCE_URL)
      .post('/sobjects/Account')
      .matchHeader('authorization', `Bearer ${salesforceAccessToken}`)
      .reply(HttpStatusCode.Ok, { id: EXAMPLES.CUSTOMER.SALESFORCE_ID, success: true, errors: [] });

    // Act
    const { status } = await api.post(url, payload);

    // Assert
    expect(status).toBe(HttpStatusCode.Created);
    expect(salesforceAuthRequest.isDone()).toBe(true);
    expect(salesforceCreateAccountRequest.isDone()).toBe(true);

    const authParams = Object.fromEntries(new URLSearchParams(salesforceAuthRequestBody));

    expect(authParams).toStrictEqual({
      grant_type: 'client_credentials',
      client_id: ENVIRONMENT_VARIABLES.SALESFORCE_CLIENT_ID,
      client_secret: ENVIRONMENT_VARIABLES.SALESFORCE_CLIENT_SECRET,
    });
  });
});
