import { EXAMPLES } from '@ukef/constants';

import { mapOdsClassification } from './map-ods-classification';

describe('mapOdsClassification', () => {
  it('should return a mapped ODS classification', () => {
    // Arrange
    const mockClassification = EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE;

    // Act
    const result = mapOdsClassification(mockClassification);

    // Assert
    const expected = {
      type: mockClassification.classification_type,
      typeCode: mockClassification.classification_type_code,
      code: mockClassification.classification_code,
      description: mockClassification.classification_description,
      isActive: mockClassification.classification_active_flag,
    };

    expect(result).toEqual(expected);
  });
});
