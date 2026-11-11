import { EXAMPLES } from '@ukef/constants';
import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { Api } from '@ukef-test/support/api';
import { accountSoql, legacySoql, mockSalesforceQuery, SALESFORCE_ACCOUNT_RECORD, setSalesforceTestEnvironment } from '@ukef-test/support/salesforce';
import { HttpStatusCode } from 'axios';
import nock from 'nock';

describe('GET /customers/direct', () => {
  let api: Api;
  let restoreSalesforceEnvironment: () => void;

  const endpoint = '/api/v1/customers/direct';

  const legacyRecord = {
    Id: 'LEGACY_CUSTOMER_ID',
    M2_1_MCD_Party_Name__c: EXAMPLES.CUSTOMER.NAME,
    M2_1_MCD_Party_URN__c: EXAMPLES.CUSTOMER.PARTYURN,
    M2_1_MCD_Company_Reg_Number__c: EXAMPLES.CUSTOMER.COMPANYREG,
    M2_1_MCD_UK_or_Overseas__c: EXAMPLES.CUSTOMER.UK_ENTITY,
    M2_1_MCD_Party_Type__c: EXAMPLES.CUSTOMER.SALESFORCE_TYPE,
    M2_1_MCD_Party_Sub_Type__c: EXAMPLES.CUSTOMER.SALESFORCE_SUBTYPE,
  };

  const searchParameters = [
    {
      parameter: 'companyReg',
      query: { companyReg: EXAMPLES.CUSTOMER.COMPANYREG },
      accountWhere: `Company_Registration_Number__c = '${EXAMPLES.CUSTOMER.COMPANYREG}'`,
      legacyWhere: `M2_1_MCD_Company_Reg_Number__c = '${EXAMPLES.CUSTOMER.COMPANYREG}'`,
    },
    {
      parameter: 'partyUrn',
      query: { partyUrn: EXAMPLES.CUSTOMER.PARTYURN },
      accountWhere: `Party_URN__c = '${EXAMPLES.CUSTOMER.PARTYURN}'`,
      legacyWhere: `M2_1_MCD_Party_URN__c = '${EXAMPLES.CUSTOMER.PARTYURN}'`,
    },
    {
      parameter: 'name',
      query: { name: EXAMPLES.CUSTOMER.NAME },
      accountWhere: `Name LIKE '%${EXAMPLES.CUSTOMER.NAME}%'`,
      legacyWhere: `M2_1_MCD_Party_Name__c LIKE '%${EXAMPLES.CUSTOMER.NAME}%'`,
    },
  ];

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

  withClientAuthenticationTests({
    givenTheRequestWouldOtherwiseSucceed: () => {
      mockSalesforceQuery(accountSoql(`Company_Registration_Number__c = '${EXAMPLES.CUSTOMER.COMPANYREG}'`), [SALESFORCE_ACCOUNT_RECORD]);
    },
    makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) =>
      api.getWithoutAuth(
        getDirectPath({ companyReg: EXAMPLES.CUSTOMER.COMPANYREG, fallbackToLegacyData: 'no' }),
        incorrectAuth?.headerName,
        incorrectAuth?.headerValue,
      ),
  });

  describe('search parameters', () => {
    describe.each(searchParameters)('when searching by $parameter', ({ query, accountWhere, legacyWhere }) => {
      it('returns matching Account records when fallback is disabled', async () => {
        mockSalesforceQuery(accountSoql(accountWhere), [SALESFORCE_ACCOUNT_RECORD]);

        const { status, body } = await api.get(getDirectPath({ ...query, fallbackToLegacyData: 'no' }));

        expect(status).toBe(HttpStatusCode.Ok);
        expect(body).toMatchObject([
          {
            partyUrn: EXAMPLES.CUSTOMER.PARTYURN,
            name: EXAMPLES.CUSTOMER.NAME,
            sfId: EXAMPLES.CUSTOMER.SALESFORCE_ID,
            companyRegNo: EXAMPLES.CUSTOMER.COMPANYREG,
            isLegacyRecord: false,
          },
        ]);
      });

      it('returns matching legacy records when legacy-only is selected', async () => {
        mockSalesforceQuery(legacySoql(legacyWhere), [legacyRecord]);

        const { status, body } = await api.get(getDirectPath({ ...query, fallbackToLegacyData: 'legacy-only' }));

        expect(status).toBe(HttpStatusCode.Ok);
        expect(body).toMatchObject([
          {
            partyUrn: EXAMPLES.CUSTOMER.PARTYURN,
            name: EXAMPLES.CUSTOMER.NAME,
            sfId: 'LEGACY_CUSTOMER_ID',
            companyRegNo: EXAMPLES.CUSTOMER.COMPANYREG,
            isLegacyRecord: true,
          },
        ]);
      });
    });
  });

  describe('fallback behavior', () => {
    const query = { companyReg: EXAMPLES.CUSTOMER.COMPANYREG };
    const accountWhere = `Company_Registration_Number__c = '${EXAMPLES.CUSTOMER.COMPANYREG}'`;
    const legacyWhere = `M2_1_MCD_Company_Reg_Number__c = '${EXAMPLES.CUSTOMER.COMPANYREG}'`;

    it('uses Account results for yes and does not query legacy records when Account matches', async () => {
      mockSalesforceQuery(accountSoql(accountWhere), [SALESFORCE_ACCOUNT_RECORD]);

      const { status, body } = await api.get(getDirectPath({ ...query, fallbackToLegacyData: 'yes' }));

      expect(status).toBe(HttpStatusCode.Ok);
      expect(body).toMatchObject([{ isLegacyRecord: false }]);
      expect(nock.isDone()).toBe(true);
    });

    it('falls back to legacy records for yes when Account has no matches', async () => {
      mockSalesforceQuery(accountSoql(accountWhere), []);
      mockSalesforceQuery(legacySoql(legacyWhere), [legacyRecord]);

      const { status, body } = await api.get(getDirectPath({ ...query, fallbackToLegacyData: 'yes' }));

      expect(status).toBe(HttpStatusCode.Ok);
      expect(body).toMatchObject([{ isLegacyRecord: true }]);
      expect(nock.isDone()).toBe(true);
    });

    it('does not query legacy records for no when Account has no matches', async () => {
      mockSalesforceQuery(accountSoql(accountWhere), []);

      const { status, body } = await api.get(getDirectPath({ ...query, fallbackToLegacyData: 'no' }));

      expect(status).toBe(HttpStatusCode.Ok);
      expect(body).toStrictEqual([]);
      expect(nock.isDone()).toBe(true);
    });
  });

  describe('search validation', () => {
    it.each([
      { description: 'no search parameter', query: { fallbackToLegacyData: 'no' } },
      {
        description: 'multiple search parameters',
        query: { companyReg: EXAMPLES.CUSTOMER.COMPANYREG, partyUrn: EXAMPLES.CUSTOMER.PARTYURN },
      },
    ])('returns 400 for $description', async ({ query }) => {
      const { status, body } = await api.get(getDirectPath(query));

      expect(status).toBe(HttpStatusCode.BadRequest);
      expect(body).toMatchObject({
        error: 'Bad Request',
        message: 'One and just one search parameter is required',
        statusCode: HttpStatusCode.BadRequest,
      });
    });

    it('returns 400 for an unsupported fallback option', async () => {
      const { status, body } = await api.get(getDirectPath({ companyReg: EXAMPLES.CUSTOMER.COMPANYREG, fallbackToLegacyData: 'invalid' }));

      expect(status).toBe(HttpStatusCode.BadRequest);
      expect(body).toMatchObject({ error: 'Bad Request', statusCode: HttpStatusCode.BadRequest });
      expect(body.message).toContain('fallbackToLegacyData must be one of the following values: yes, no, legacy-only');
    });
  });

  const getDirectPath = (query: Record<string, string>): string => `${endpoint}?${new URLSearchParams(query).toString()}`;
});
