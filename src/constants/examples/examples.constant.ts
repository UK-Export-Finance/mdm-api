import { DOM_BUSINESS_CENTRES } from '../dom.constant';
import { ODS_BUSINESS_CENTRES } from '../ods.constant';

const BUSINESS_CENTRE = {
  ...DOM_BUSINESS_CENTRES.GH_ACC,
  NON_WORKING_DAY: {
    NAME: 'Weekend',
    DATE: '2025-07-05',
  },
};

const COUNTERPARTY_SUBTYPES = {
  BROKER: 'BROKER',
  GUARANTOR: 'GUARANTOR',
};

const PRODUCT_CONFIG_REQUIREMENT = {
  NOT_APPLICABLE: 'NOT_APPLICABLE',
  OPTIONAL: 'OPTIONAL',
  REQUIRED: 'REQUIRED',
};

export const EXAMPLES = {
  BUSINESS_CENTRE,
  COMPANIES_HOUSE_REGISTRATION_NUMBER: '00000001',
  CUSTOMER: {
    COMPANYREG: '06012345',
    PARTYURN: '00302069',
    NAME: 'Testing Systems Ltd',
    CREDIT_RISK_RATING: 'B+',
    LOSS_GIVEN_DEFAULT: 50,
  },
  DEAL: {
    ID: '0030000321',
    NAME: 'ABC PARIS CLUB 01',
    DESCRIPTION: 'Paris Club agreement',
  },
  DOM: {
    BUSINESS_CENTRES: [
      {
        code: DOM_BUSINESS_CENTRES.AE_DXB.CODE,
        name: DOM_BUSINESS_CENTRES.AE_DXB.NAME,
      },
      {
        code: DOM_BUSINESS_CENTRES.CM_YAO.CODE,
        name: DOM_BUSINESS_CENTRES.CM_YAO.NAME,
      },
      {
        code: DOM_BUSINESS_CENTRES.JO_AMM.CODE,
        name: DOM_BUSINESS_CENTRES.JO_AMM.NAME,
      },
    ],
    BUSINESS_CENTRES_NON_WORKING_DAYS: [
      {
        code: DOM_BUSINESS_CENTRES.AE_DXB.CODE,
        date: BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
        name: DOM_BUSINESS_CENTRES.AE_DXB.NAME,
      },
      {
        code: DOM_BUSINESS_CENTRES.CM_YAO.CODE,
        date: BUSINESS_CENTRE.NON_WORKING_DAY.DATE,
        name: DOM_BUSINESS_CENTRES.CM_YAO.NAME,
      },
    ],
    PRODUCT_CONFIG: {
      productType: 'EXIP',
      configuration: {
        commitmentDate: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        issuedDate: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        effectiveDate: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        availabilityEndDate: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        expiryDate: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        creditType: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        participations: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        scheduledRepayments: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        nonCashObligations: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        cashObligations: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        accrualSchedule: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        pimOwner: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        riskRating: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        preCreditPeriod: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        creditPeriod: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        lossGivenDefault: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        provisionRate: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
        forecastYear: PRODUCT_CONFIG_REQUIREMENT.NOT_APPLICABLE,
        bankRate: PRODUCT_CONFIG_REQUIREMENT.OPTIONAL,
      },
      counterpartySubtypes: [COUNTERPARTY_SUBTYPES.BROKER, COUNTERPARTY_SUBTYPES.GUARANTOR],
      productSubtypes: [],
      account: ['1', '2', '3'],
    },
  },
  GEOSPATIAL: {
    ENGLISH_POSTCODE: 'SW1A 2AQ',
    NORTHERN_IRELAND_POSTCODE: 'BT7 3GG',
    WALES_POSTCODE: 'SY23 3AR',
    SCOTLAND_POSTCODE: 'EH1 1JF',
    ORGANISATION_NAME: 'CHURCHILL MUSEUM & CABINET WAR ROOMS',
    ADDRESS_LINE_1: 'CLIVE STEPS KING CHARLES STREET',
    LOCALITY: 'LONDON',
  },
  GOVUK_NOTIFY: {
    EMAIL: 'john.tester@example.com',
    FROM_EMAIL: 'test@notifications.service.gov.uk',
    FIRST_NAME: 'John',
    EMAIL_SUBJECT: 'Status update: EuroStar bridge',
    EMAIL_BODY:
      'Dear John Smith,\r\n\r\nThe status of your MIA for EuroStar has been updated.\r\n\r\n* Your bank reference: EuroStar bridge\r\n* Current status: Acknowledged\r\n* Previous status: Submitted\r\n* Updated by: Joe Bloggs (Joe.Bloggs@example.com)\r\n\r\nSign in to our service for more information: \r\nhttps://www.test.service.gov.uk/\r\n\r\nWith regards,\r\n\r\nThe Digital Trade Finance Service team\r\n\r\nEmail: test@test.gov.uk\r\nPhone: +44 (0)202 123 4567\r\nOpening times: Monday to Friday, 9am to 5pm (excluding public holidays)',
    REFERENCE: 'tmpl1234-1234-5678-9012-abcd12345678-1713272155576',
    RESPONSE_ID: 'efd12345-1234-5678-9012-ee123456789f',
    RESPONSE_URI: 'https://api.notifications.service.gov.uk/v2/notifications/efd12345-1234-5678-9012-ee123456789f',
    TEMPLATE_ID: 'tmpl1234-1234-5678-9012-abcd12345678',
    TEMPLATE_URI: 'https://api.notifications.service.gov.uk/services/abc12345-a123-4567-8901-123456789012/templates/tmpl1234-1234-5678-9012-abcd12345678',
    FILE: '<Buffer 43 31 2c 43 32 2c 43 33 0a 41 2c 42 2c 43 0a 44 2c 45 2c 46 0a 31 2c 32 2c 33 0a 34 2c 35 2c 36 0a>',
  },
  ODS: {
    BUSINESS_CENTRES: [
      {
        business_centre_code: ODS_BUSINESS_CENTRES.AaB,
        business_centre_name: 'Mock name AaB',
      },
      {
        business_centre_code: ODS_BUSINESS_CENTRES.JoB,
        business_centre_name: 'Mock name JoB',
      },
      {
        business_centre_code: ODS_BUSINESS_CENTRES.StB,
        business_centre_name: 'Mock name StB',
      },
    ],
  },
};
