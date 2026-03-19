export const mockProductConfigs = [
  {
    productType: 'PRT001',
    name: 'Mock name',
    shortName: 'BIP',
    productActive: true,
    configuration: {
      creditType: 'Mock credit type',
      leadDays: {
        repayments: 1,
        interestAccruals: 1,
        accruingFees: 1,
      },
    },
    counterpartyRoleTypes: [],
    facilityCategoryTypes: [],
    obligationSubtypes: ['OST001', 'OST003', 'OST006'],
    account: [],
    additionalRateTypes: [],
    baseRateTypes: [],
    accrualScheduleTypes: [],
  },
  {
    productType: 'PRT002',
    name: 'Mock name',
    shortName: 'EXIP',
    productActive: true,
    configuration: {
      creditType: 'Mock credit type',
      leadDays: {
        repayments: 1,
        interestAccruals: 1,
        accruingFees: 1,
      },
    },
    counterpartyRoleTypes: [],
    facilityCategoryTypes: [],
    obligationSubtypes: ['OST001', 'OST002', 'OST004', 'OST005'],
    account: [],
    additionalRateTypes: [],
    baseRateTypes: [],
    accrualScheduleTypes: [],
  },
];

export const mockObligationSubtype = {
  type: 'Mock obligation Sub-Type',
  typeCode: 'obligationSubtype',
  description: 'Mock description',
  isActive: true,
};

export const mockObligationSubtypes = [
  { ...mockObligationSubtype, code: 'OST001' },
  { ...mockObligationSubtype, code: 'OST002' },
  { ...mockObligationSubtype, code: 'OST003' },
  { ...mockObligationSubtype, code: 'OST004' },
  { ...mockObligationSubtype, code: 'OST005' },
  { ...mockObligationSubtype, code: 'OST006' },
];
