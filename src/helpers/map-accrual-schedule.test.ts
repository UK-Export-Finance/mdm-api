import { EXAMPLES } from '@ukef/constants';

import { mapAccrualSchedule } from './map-accrual-schedule';

describe('mapAccrualSchedule', () => {
  it('should return a mapped ODS accrual schedule', () => {
    // Arrange
    const mockSchedule = EXAMPLES.ODS.ACCRUAL_SCHEDULE;

    // Act
    const result = mapAccrualSchedule(mockSchedule);

    // Assert
    const expected = {
      type: mockSchedule.classification_type,
      typeCode: mockSchedule.classification_type_code,
      code: mockSchedule.classification_code,
      description: mockSchedule.classification_description,
      numericValue: mockSchedule.classification_numeric_value,
      isActive: mockSchedule.classification_active_flag,
    };

    expect(result).toEqual(expected);
  });
});
