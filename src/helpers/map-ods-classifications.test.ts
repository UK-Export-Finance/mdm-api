import { EXAMPLES } from '@ukef/constants';

import { mapOdsClassification } from './map-ods-classification';
import { mapOdsClassifications } from './map-ods-classifications';

describe('mapOdsClassifications', () => {
  it('should return an array of mapped accrual schedules', () => {
    // Arrange
    const mockClassification = EXAMPLES.ODS.ACCRUAL_SCHEDULE_CLASSIFICATION.ADDITIONAL_RATE;
    const mockClassifications = [mockClassification, mockClassification];

    // Act
    const result = mapOdsClassifications(mockClassifications);

    // Assert
    const expected = [mapOdsClassification(mockClassification), mapOdsClassification(mockClassification)];

    expect(result).toEqual(expected);
  });
});
