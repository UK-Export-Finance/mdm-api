import { EXAMPLES } from '@ukef/constants';
import { HttpStatusCode } from 'axios';
import nock from 'nock';

export const SALESFORCE_TEST_ORIGIN = 'https://salesforce.test';
const SALESFORCE_TEST_ACCESS_URL = `${SALESFORCE_TEST_ORIGIN}/services/oauth2/token`;
const SALESFORCE_TEST_INSTANCE_URL = `${SALESFORCE_TEST_ORIGIN}/services/data/v53.0`;
const SALESFORCE_TEST_ACCESS_TOKEN = 'TEST_SALESFORCE_ACCESS_TOKEN';

export const SALESFORCE_ACCOUNT_RECORD = {
  Id: EXAMPLES.CUSTOMER.SALESFORCE_ID,
  Name: EXAMPLES.CUSTOMER.NAME,
  Party_URN__c: EXAMPLES.CUSTOMER.PARTYURN,
  Company_Registration_Number__c: EXAMPLES.CUSTOMER.COMPANYREG,
  CCM_Probability_of_Default__c: EXAMPLES.CUSTOMER.PROBABILITY_OF_DEFAULT,
  CCM_Citizenship_Class__c: EXAMPLES.CUSTOMER.UK_ENTITY,
  CCM_Industry__c: EXAMPLES.CUSTOMER.UK_INDUSTRY_NAME,
  CCM_Industry_Group__c: EXAMPLES.CUSTOMER.UK_INDUSTRY_SECTOR_NAME,
  Account_Type__c: EXAMPLES.CUSTOMER.SALESFORCE_TYPE,
  Account_Sub_Type__c: EXAMPLES.CUSTOMER.SALESFORCE_SUBTYPE,
  CCM_Assigned_Rating__c: EXAMPLES.CUSTOMER.UK_ENTITY,
  CCM_Watch_List__c: EXAMPLES.CUSTOMER.CREDIT_CLASSIFICATION_STATUS.GOOD,
  CCM_Watch_List_Date__c: EXAMPLES.CUSTOMER.CREDIT_RISK_RATING_DATE,
};

export const LEGACY_ACCOUNT_RECORD = {
  Id: EXAMPLES.CUSTOMER.SALESFORCE_ID,
  M2_1_MCD_Party_URN__c: EXAMPLES.CUSTOMER.PARTYURN,
  M2_1_MCD_Party_Name__c: EXAMPLES.CUSTOMER.NAME,
  M2_1_MCD_Company_Reg_Number__c: EXAMPLES.CUSTOMER.COMPANYREG,
  M2_1_MCD_UK_or_Overseas__c: EXAMPLES.CUSTOMER.UK_ENTITY,
  M2_1_MCD_Party_Type__c: EXAMPLES.CUSTOMER.SALESFORCE_TYPE,
  M2_1_MCD_Party_Sub_Type__c: EXAMPLES.CUSTOMER.SALESFORCE_SUBTYPE,
};

export const setSalesforceTestEnvironment = (): (() => void) => {
  const originalInstanceUrl = process.env.SALESFORCE_INSTANCE_URL;
  const originalClientId = process.env.SALESFORCE_CLIENT_ID;
  const originalClientSecret = process.env.SALESFORCE_CLIENT_SECRET;
  const originalAccessUrl = process.env.SALESFORCE_ACCESS_URL;

  process.env.SALESFORCE_INSTANCE_URL = SALESFORCE_TEST_INSTANCE_URL;
  process.env.SALESFORCE_CLIENT_ID = 'TEST_SALESFORCE_CLIENT_ID';
  process.env.SALESFORCE_CLIENT_SECRET = 'TEST_SALESFORCE_CLIENT_SECRET';
  process.env.SALESFORCE_ACCESS_URL = SALESFORCE_TEST_ACCESS_URL;

  return () => {
    if (originalInstanceUrl === undefined) {
      delete process.env.SALESFORCE_INSTANCE_URL;
    } else {
      process.env.SALESFORCE_INSTANCE_URL = originalInstanceUrl;
    }

    if (originalClientId === undefined) {
      delete process.env.SALESFORCE_CLIENT_ID;
    } else {
      process.env.SALESFORCE_CLIENT_ID = originalClientId;
    }

    if (originalClientSecret === undefined) {
      delete process.env.SALESFORCE_CLIENT_SECRET;
    } else {
      process.env.SALESFORCE_CLIENT_SECRET = originalClientSecret;
    }

    if (originalAccessUrl === undefined) {
      delete process.env.SALESFORCE_ACCESS_URL;
    } else {
      process.env.SALESFORCE_ACCESS_URL = originalAccessUrl;
    }
  };
};

export const accountSoql = (
  where: string,
): string => `SELECT Id, Name, Party_URN__c, Company_Registration_Number__c, CCM_Customer_Type__c, CCM_Probability_of_Default__c, CCM_Citizenship_Class__c, CCM_Industry__c, CCM_Industry_Group__c, Account_Type__c, Account_Sub_Type__c, CCM_Assigned_Rating__c, CCM_Watch_List__c, CCM_Watch_List_Date__c
      FROM Account
      WHERE ${where}
      LIMIT 100`;

export const legacySoql = (
  where: string,
): string => `SELECT Id, M2_1_MCD_Party_URN__c, M2_1_MCD_Party_Name__c, M2_1_MCD_Company_Reg_Number__c, M2_1_MCD_UK_or_Overseas__c, M2_1_MCD_Party_Type__c, M2_1_MCD_Party_Sub_Type__c
      FROM M2_1_MCD_Legacy_Data_Party__c
      WHERE ${where}
      LIMIT 200`;

export const mockSalesforceQuery = (soql: string, records: unknown[]): void => {
  nock(SALESFORCE_TEST_ORIGIN).post('/services/oauth2/token').reply(HttpStatusCode.Ok, { access_token: SALESFORCE_TEST_ACCESS_TOKEN });

  nock(SALESFORCE_TEST_ORIGIN)
    .get('/services/data/v53.0/query')
    .query({ q: soql })
    .matchHeader('authorization', `Bearer ${SALESFORCE_TEST_ACCESS_TOKEN}`)
    .reply(HttpStatusCode.Ok, { records });
};

export const mockSalesforceLegacyQuery = (soql: string, records: unknown[]): void => {
  nock(SALESFORCE_TEST_ORIGIN).post('/services/oauth2/token').reply(HttpStatusCode.Ok, { access_token: SALESFORCE_TEST_ACCESS_TOKEN });

  nock(SALESFORCE_TEST_ORIGIN)
    .get('/services/data/v53.0/query')
    .query({ q: soql })
    .matchHeader('authorization', `Bearer ${SALESFORCE_TEST_ACCESS_TOKEN}`)
    .reply(HttpStatusCode.Ok, { records });
};
