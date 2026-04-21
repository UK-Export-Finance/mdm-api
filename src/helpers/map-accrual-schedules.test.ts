import { EXAMPLES } from '@ukef/constants';

import { mapAccrualSchedule } from './map-accrual-schedule';
import { mapAccrualSchedules } from './map-accrual-schedules';

describe('mapAccrualSchedules', () => {
  it('should return an array of accrual schedules', () => {
    // Arrange
    const mockSchedules = [EXAMPLES.ODS.ACCRUAL_SCHEDULE, EXAMPLES.ODS.ACCRUAL_SCHEDULE, EXAMPLES.ODS.ACCRUAL_SCHEDULE];

    // Act
    const result = mapAccrualSchedules(mockSchedules);

    // Assert
    const expected = [mapAccrualSchedule(mockSchedules[0]), mapAccrualSchedule(mockSchedules[1]), mapAccrualSchedule(mockSchedules[2])];

    expect(result).toEqual(expected);
  });
});
