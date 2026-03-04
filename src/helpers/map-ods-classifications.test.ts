import { EXAMPLES } from '@ukef/constants';

import { mapOdsClassification } from './map-ods-classification';
import { mapOdsClassifications } from './map-ods-classifications';

describe('mapOdsClassifications', () => {
  it('should return an array of mapped accrual schedules', () => {
    // Arrange
    const mockClassifications = [EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION, EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION];

    // Act
    const result = mapOdsClassifications(mockClassifications);

    // Assert
    const expected = [mapOdsClassification(EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION), mapOdsClassification(EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION)];

    expect(result).toEqual(expected);
  });
});
