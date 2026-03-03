import { EXAMPLES } from '@ukef/constants';

import { mapAccrualScheduleClassification } from './map-accrual-schedule-classification';

describe('mapAccrualScheduleClassification', () => {
  it('should return a mapped ODS accrual schedule classification', () => {
    // Arrange
    const mockClassification = EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION;

    // Act
    const result = mapAccrualScheduleClassification(mockClassification);

    // Assert
    const expected = {
      type: mockClassification.classification_type,
      typeCode: mockClassification.classification_type_code,
      code: mockClassification.classification_code,
      description: mockClassification.classification_description,
      numericValue: mockClassification.classification_numeric_value,
      isActive: mockClassification.classification_active_flag,
    };

    expect(result).toEqual(expected);
  });
});
