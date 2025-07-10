import { GetOdsBusinessCentreNonWorkingDayResponse } from '@ukef/modules/ods/dto';

import { mapBusinessCentreNonWorkingDays } from './map-business-centre-non-working-days';

const mockNonWorkingDays: GetOdsBusinessCentreNonWorkingDayResponse[] = [
  {
    business_centre_code: 'A',
    non_working_day_name: 'Business centre A',
    non_working_day_date: '2025-01-01',
  },
  {
    business_centre_code: 'B',
    non_working_day_name: 'Business centre B',
    non_working_day_date: '2025-01-02',
  },
  {
    business_centre_code: 'C',
    non_working_day_name: 'Business centre C',
    non_working_day_date: '2025-01-03',
  },
];

describe('mapBusinessCentreNonWorkingDays', () => {
  it('should return an array of mapped non working days', () => {
    // Act
    const result = mapBusinessCentreNonWorkingDays(mockNonWorkingDays);

    // Assert
    const expected = [
      {
        code: mockNonWorkingDays[0].business_centre_code,
        name: mockNonWorkingDays[0].non_working_day_name,
        date: mockNonWorkingDays[0].non_working_day_date,
      },
      {
        code: mockNonWorkingDays[1].business_centre_code,
        name: mockNonWorkingDays[1].non_working_day_name,
        date: mockNonWorkingDays[1].non_working_day_date,
      },
      {
        code: mockNonWorkingDays[2].business_centre_code,
        name: mockNonWorkingDays[2].non_working_day_name,
        date: mockNonWorkingDays[2].non_working_day_date,
      },
    ];

    expect(result).toEqual(expected);
  });

  describe('when an empty array is provided', () => {
    it('should return an empty array', () => {
      // Act
      const result = mapBusinessCentreNonWorkingDays([]);

      // Assert
      expect(result).toEqual([]);
    });
  });
});
