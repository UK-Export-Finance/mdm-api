import { EXAMPLES } from '@ukef/constants';

import { mapAccrualScheduleClassification } from './map-accrual-schedule-classification';
import { mapAccrualScheduleClassifications } from './map-accrual-schedule-classifications';

describe('mapAccrualScheduleClassifications', () => {
  it('should return an array of mapped accrual schedule classifications', () => {
    // Arrange
    const mockClassifications = [EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION, EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION];

    // Act
    const result = mapAccrualScheduleClassifications(mockClassifications);

    // Assert
    const expected = [
      mapAccrualScheduleClassification(EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION),
      mapAccrualScheduleClassification(EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION),
    ];

    expect(result).toEqual(expected);
  });
});
