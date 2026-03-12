import { EXAMPLES } from '@ukef/constants';

import { mapCounterpartyRole } from './map-counterparty-role';
import { mapCounterpartyRoles } from './map-counterparty-roles';

describe('mapCounterpartyRoles', () => {
  it('should return an array of counterparty roles', () => {
    // Arrange
    const mockRoles = [
      EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE,
      EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE,
      EXAMPLES.ODS.CONFIGURATION_COUNTERPARTY_ROLE,
    ];

    // Act
    const result = mapCounterpartyRoles(mockRoles);

    // Assert
    const expected = [mapCounterpartyRole(mockRoles[0]), mapCounterpartyRole(mockRoles[1]), mapCounterpartyRole(mockRoles[2])];

    expect(result).toEqual(expected);
  });
});
