import { DOM_BUSINESS_CENTRES } from '../dom.constant';
import { ODS_BUSINESS_CENTRES, ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES } from '../ods.constant';

const BUSINESS_CENTRE = {
  ...DOM_BUSINESS_CENTRES.GH_ACC,
  NON_WORKING_DAY: {
    NAME: 'Weekend',
    DATE: '2025-07-05',
  },
};

const COUNTERPARTY_ROLE_TYPES = {
  BROKER: 'BROKER',
  GUARANTOR: 'GUARANTOR',
};

const INDUSTRY = {
  ID: 'UKEF_1908',
  CODE: '1908',
  DESCRIPTION: 'MINING & METALS : MISCELLANEOUS',
  GROUP_CODE: '19',
  GROUP_DESCRIPTION: 'CIVIL: MINING & METALS',
  CATEGORY: 'UKEF',
};

const OBLIGATION_SUBTYPE = {
  TYPE: 'Obligation Sub-Type',
  TYPE_CODE: 'obligationSubtype',
  CODE: 'OST012',
  DESCRIPTION: 'BSS Advance Payment Guarantee',
  IS_ACTIVE: true,
};

const PRODUCT_CONFIG_REQUIREMENT = {
  NOT_APPLICABLE: 'NOT_APPLICABLE',
  OPTIONAL: 'OPTIONAL',
  REQUIRED: 'REQUIRED',
};

const PRODUCT_TYPES = {
  BIP: 'PRT001',
  EXIP: 'PRT002',
  BSS: 'PRT003',
  GEF: 'PRT004',
};

export const EXAMPLES = {
  ACCRUAL_FREQUENCY: {
    CODE: 'FREQ12MON',
    NAME: 'Annually',
    ORDER_ID: 4,
    FREQUENCY_NUMBER_OF_UNITS: 12,
    FREQUENCY_UNIT: 'Months',
    IS_ACTIVE: true,
  },
  ACCRUAL_SCHEDULE: {
    CODE: 'CTL01',
    NAME: 'Contractual Interest Fixed Rate',
    ACCRUAL_RATE_TYPE: 'Fixed',
    BASE_BALANCE_CATEGORY: 'On Principal Drawn Amount',
    INCOME_CLASS_CODE: 'Income',
    IS_ACTIVE: true,
  },
  ACCRUAL_SCHEDULE_CLASSIFICATION: {
    ADDITIONAL_RATE: {
      TYPE: 'Additional Rate Type',
      TYPE_CODE: ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES.ADDITIONAL_RATE_TYPE,
      CODE: 'ARTCAS',
      DESCRIPTION: 'CAS - Credit Adjustment Spread',
      IS_ACTIVE: true,
    },
    BASE_RATE: {
      TYPE: 'Base Rate Type',
      TYPE_CODE: ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES.BASE_RATE_TYPE,
      CODE: 'BRTBANK',
      DESCRIPTION: 'Bank Rate',
      IS_ACTIVE: true,
    },
  },
  BUSINESS_CENTRE,
  COMPANIES_HOUSE_REGISTRATION_NUMBER: '00000001',
  COMPANIES_HOUSE_INDUSTRY_CODE: '25920',
  COMPANIES_HOUSE_INDUSTRY_CODE_FOUR_DIGITS: '6820',
  COUNTERPARTY_ROLE: {
    ROLE_TYPE: 'CRT001',
    NAME: 'Exporter',
    HAS_SHARE_PERCENTAGE: false,
    IS_ACTIVE: true,
  },
  CREDIT_RISK_RATINGS: [
    {
      id: 1,
      name: 1,
      description: 'AAA',
      createdAt: '2017-03-06T16:43:13.943Z',
      updatedAt: '2017-03-06T16:43:13.943Z',
      effectiveFrom: '2017-03-07T10:44:47.613Z',
      effectiveTo: '9999-12-31T00:00:00.000Z',
    },
    {
      id: 21,
      name: 21,
      description: 'C',
      createdAt: '2017-03-06T16:43:13.953Z',
      updatedAt: '2017-03-06T16:43:13.953Z',
      effectiveFrom: '2017-03-07T10:44:47.613Z',
      effectiveTo: '9999-12-31T00:00:00.000Z',
    },
  ],
  CUSTOMER: {
    COMPANYREG: '06012345',
    CREDIT_CLASSIFICATION_STATUS: {
      GOOD: 'Good',
    },
    CREDIT_CLASSIFICATION_DATE: '01/01/1970',
    CREDIT_RISK_RATING: 'B+',
    CREDIT_RISK_RATING_DATE: '1989-09-20',
    DNB_NUMBER: '12341234',
    NAME: 'Testing Systems Ltd',
    PARTYURN: '00302069',
    PROBABILITY_OF_DEFAULT: 14.1,
    RISK_ENTITY: {
      CORPORATE: 'Corporate',
    },
    LOSS_GIVEN_DEFAULT: 50,
    SALESFORCE_ID: '000A000000a1BBbCDE',
    SALESFORCE_IS_LEGACY: false,
    SALESFORCE_SUBTYPE: 'Alternative Finance Provider',
    SALESFORCE_TYPE: 'Association',
    UK_ENTITY: 'Yes',
    UK_INDUSTRY_NAME: 'AGRICULTURE, HORTICULTURE & FISHERIES',
    UK_INDUSTRY_SECTOR_NAME: 'CIVIL: AGRICULTURE, HORTICULTURE & FISHERIES',
  },
  DEAL: {
    ID: '0030000321',
    NAME: 'ABC PARIS CLUB 01',
    DESCRIPTION: 'Paris Club agreement',
  },
  FACILITY_CATEGORY: {
    TYPE: 'Facility Category',
    TYPE_CODE: 'facilityCategory',
    CODE: 'FCT006',
    DESCRIPTION: 'GEF: Contingent',
    IS_ACTIVE: true,
  },
  INDUSTRY,
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
      BIP: {
        productType: PRODUCT_TYPES.BIP,
        name: 'Bond Insurance Product (BIP)',
        shortName: 'BIP',
        productActive: true,
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
          fees: {
            creation: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
            inLife: PRODUCT_CONFIG_REQUIREMENT.OPTIONAL,
          },
          leadDays: {
            repayments: 1,
            interestAccruals: 2,
            accruingFees: 3,
          },
        },
        additionalRates: ['ARTOTH'],
        accrualSchedules: [
          {
            code: 'PAC01',
            cashIndicator: true,
          },
        ],
        baseRates: ['BRTOTH'],
        counterpartyRoleTypes: [COUNTERPARTY_ROLE_TYPES.BROKER],
        facilityCategoryTypes: ['FCT001', 'FCT002'],
        obligationSubtypes: ['OST001', 'OST002', 'OST003'],
        additionalRateTypes: [],
        baseRateTypes: [],
        accrualScheduleTypes: [],
        account: ['1', '2', '3'],
      },
      EXIP: {
        productType: PRODUCT_TYPES.EXIP,
        name: 'Export Insurance Product (EXIP)',
        shortName: 'EXIP',
        productActive: true,
        configuration: {
          commitmentDate: PRODUCT_CONFIG_REQUIREMENT.REQUIRED,
          issuedDate: PRODUCT_CONFIG_REQUIREMENT.NOT_APPLICABLE,
          effectiveDate: PRODUCT_CONFIG_REQUIREMENT.OPTIONAL,
        },
        counterpartyRoleTypes: [COUNTERPARTY_ROLE_TYPES.BROKER, COUNTERPARTY_ROLE_TYPES.GUARANTOR],
        facilityCategoryTypes: ['FCT001', 'FCT002'],
        obligationSubtypes: ['OST001', 'OST002', 'OST003'],
        account: ['1', '2', '3'],
      },
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
  OBLIGATION_SUBTYPE,
  OBLIGATION_SUBTYPE_WITH_PRODUCT_TYPE: {
    ...OBLIGATION_SUBTYPE,
    productTypeCode: PRODUCT_TYPES.BIP,
  },
  ODS: {
    ACCRUAL_SCHEDULE: {
      code: 'CTL01',
      name: 'Contractual Interest Fixed Rate',
      accrualRateType: 'Fixed',
      baseBalanceCategory: 'On Principal Drawn Amount',
      incomeClassCode: 'Income',
      accrualScheduleTypeActive: true,
    },
    ACCRUAL_SCHEDULE_CLASSIFICATION: {
      ADDITIONAL_RATE: {
        classification_type: 'Additional Rate Type',
        classification_type_code: ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES.ADDITIONAL_RATE_TYPE,
        classification_code: 'ARTCAS',
        classification_description: 'CAS - Credit Adjustment Spread',
        classification_numeric_value: 1,
        classification_active_flag: true,
      },
      BASE_RATE: {
        classification_type: 'Base Rate Type',
        classification_type_code: ODS_SCHEDULE_CLASSIFICATION_TYPE_CODES.BASE_RATE_TYPE,
        classification_code: 'BRTBANK',
        classification_description: 'Bank Rate',
        classification_numeric_value: 1,
        classification_active_flag: true,
      },
    },
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
    CONFIGURATION_COUNTERPARTY_ROLE: {
      counterpartyRoleType: 'CRT001',
      name: 'Exporter',
      hasSharePercentage: false,
      counterpartyRoleTypeActive: true,
    },
    CONFIGURATION_FREQUENCY: {
      code: 'FREQ12MON',
      name: 'Annually',
      orderId: 4,
      frequencyNumberOfUnits: 12,
      frequencyUnits: 'Months',
      frequencyActive: true,
    },
    FACILITY_CLASSIFICATION: {
      classification_type: 'Facility Category',
      classification_type_code: 'facilityCategory',
      classification_code: 'FCT006',
      classification_description: 'GEF: Contingent',
      classification_active_flag: true,
    },
    INDUSTRY: {
      industry_id: INDUSTRY.ID,
      industry_code: INDUSTRY.CODE,
      industry_description: INDUSTRY.DESCRIPTION,
      industry_group_code: INDUSTRY.GROUP_CODE,
      industry_group_description: INDUSTRY.GROUP_DESCRIPTION,
      industry_category: INDUSTRY.CATEGORY,
    },
    OBLIGATION_CLASSIFICATION: {
      classification_type: 'Obligation Sub-Type',
      classification_type_code: 'obligationSubtype',
      classification_code: 'OST012',
      classification_description: 'BSS Advance Payment Guarantee',
      classification_active_flag: true,
    },
    SIC_CODE_TO_UKEF_INDUSTRY: {
      sic_section_code: 'C',
      sic_section_legacy_code: '1003',
      sic_section_name: 'Manufacturing',
      sic_industry_code: '25920',
      sic_industry_description: 'Manufacture of light metal packaging',
      sic_industry_level: 'Class',
      sic_code_active_flag: true,
      ukef_industry_code: '1908',
      ukef_industry_description: 'MINING & METALS : MISCELLANEOUS',
      ukef_sector_code: '19',
      ukef_sector_description: 'CIVIL: MINING & METALS',
    },
  },
  PRODUCT_TYPES,
  UKEF_INDUSTRY_CODE: '1908',
};
