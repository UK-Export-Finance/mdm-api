import { OdsStoredProcedureOutputBody } from '@ukef/modules/ods/dto/ods-payloads.dto';

import { isStoredProcedureResultEmpty } from './is-stored-procedure-result-empty';

const mockBaseJson: Pick<OdsStoredProcedureOutputBody, 'query_request_id' | 'message' | 'status'> = {
  query_request_id: 'Mock request ID',
  message: 'Success',
  status: 'SUCCESS',
};

describe('isStoredProcedureResultEmpty', () => {
  it('should return true when storedProcedureJson is null', () => {
    // Act
    const result = isStoredProcedureResultEmpty(null);

    // Assert
    expect(result).toBe(true);
  });

  it('should return true when storedProcedureJson is undefined', () => {
    // Act
    const result = isStoredProcedureResultEmpty(undefined);

    // Assert
    expect(result).toBe(true);
  });

  it('should return true when a stored procedure result is empty', () => {
    // Act
    const result = isStoredProcedureResultEmpty();

    // Assert
    expect(result).toBe(true);
  });

  it('should return true when total_result_count is 0', () => {
    // Arrange
    const storedProcedureJson: OdsStoredProcedureOutputBody = {
      ...mockBaseJson,
      total_result_count: 0,
      results: [],
    };

    // Act
    const result = isStoredProcedureResultEmpty(storedProcedureJson);

    // Assert
    expect(result).toBe(true);
  });

  it('should return false when total_result_count is greater than 0', () => {
    // Arrange
    const storedProcedureJson: OdsStoredProcedureOutputBody = {
      ...mockBaseJson,
      total_result_count: 5,
      results: [{ id: 1 }, { id: 2 }],
    };

    // Act
    const result = isStoredProcedureResultEmpty(storedProcedureJson);

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when total_result_count is 1', () => {
    // Arrange
    const storedProcedureJson: OdsStoredProcedureOutputBody = {
      ...mockBaseJson,
      total_result_count: 1,
      results: [{ id: 1 }],
    };

    // Act
    const result = isStoredProcedureResultEmpty(storedProcedureJson);

    // Assert
    expect(result).toBe(false);
  });

  it('should return false when total_result_count is undefined', () => {
    // Arrange
    const storedProcedureJson: OdsStoredProcedureOutputBody = {
      ...mockBaseJson,
      total_result_count: undefined,
      results: [],
    };

    // Act
    const result = isStoredProcedureResultEmpty(storedProcedureJson);

    // Assert
    expect(result).toBe(false);
  });
});
