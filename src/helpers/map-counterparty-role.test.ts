import { EXAMPLES } from '@ukef/constants';

import { mapCounterpartyRole } from './map-counterparty-role';

describe('mapCounterpartyRole', () => {
  it('should return a mapped ODS counterparty role', () => {
    // Arrange
    const mockRole = EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE;

    // Act
    const result = mapCounterpartyRole(mockRole);

    // Assert
    const expected = {
      hasSharePercentage: mockRole.hasSharePercentage,
      hasAssociatedPaymentCode: mockRole.hasAssociatedPaymentCode,
      name: mockRole.name,
      roleType: mockRole.counterpartyRoleType,
      isActive: mockRole.counterpartyRoleTypeActive,
    };

    expect(result).toEqual(expected);
  });
});
