import { EXAMPLES } from '@ukef/constants';

import { mapAccrualSchedule } from './map-accrual-schedule';
import { mapAccrualSchedules } from './map-accrual-schedules';

describe('mapAccrualSchedules', () => {
  it('should return an array of mapped accrual schedules', () => {
    // Arrange
    const mockSchedules = [EXAMPLES.ODS.ACCRUAL_SCHEDULE, EXAMPLES.ODS.ACCRUAL_SCHEDULE];

    // Act
    const result = mapAccrualSchedules(mockSchedules);

    // Assert
    const expected = [mapAccrualSchedule(EXAMPLES.ODS.ACCRUAL_SCHEDULE), mapAccrualSchedule(EXAMPLES.ODS.ACCRUAL_SCHEDULE)];

    expect(result).toEqual(expected);
  });
});
