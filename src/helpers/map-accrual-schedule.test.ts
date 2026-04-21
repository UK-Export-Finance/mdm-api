import { EXAMPLES } from '@ukef/constants';

import { mapAccrualSchedule } from './map-accrual-schedule';

describe('mapAccrualSchedule', () => {
  it('should return a mapped accrual schedule', () => {
    // Arrange
    const mockSchedule = EXAMPLES.ODS.ACCRUAL_SCHEDULE;

    // Act
    const result = mapAccrualSchedule(mockSchedule);

    // Assert
    const expected = {
      code: mockSchedule.code,
      name: mockSchedule.name,
      accrualRateType: mockSchedule.accrualRateType,
      baseBalanceCategory: mockSchedule.baseBalanceCategory,
      incomeClassCode: mockSchedule.incomeClassCode,
      isActive: mockSchedule.accrualScheduleTypeActive,
    };

    expect(result).toEqual(expected);
  });
});
