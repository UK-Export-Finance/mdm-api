// Import the function to be tested
import { prepareModifiedRequest } from './request-field-validation-helper';

describe('prepareModifiedRequest', () => {
  it('should return an array when requestIsAnArray is true', () => {
    const modifiedRequest = { key: 'value' };
    const result = prepareModifiedRequest(true, modifiedRequest);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([modifiedRequest]);
  });

  it('should return the modified request when requestIsAnArray is false', () => {
    const modifiedRequest = { key: 'value' };
    const result = prepareModifiedRequest(false, modifiedRequest);

    expect(Array.isArray(result)).toBe(false);
    expect(result).toEqual(modifiedRequest);
  });

  it('should return an array with null when requestIsAnArray is true and modifiedRequest is null', () => {
    const result = prepareModifiedRequest(true, null);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([null]);
  });

  it('should return an array in array when requestIsAnArray is true and modifiedRequest is an array', () => {
    const modifiedRequest = [{ key: 'value1' }, { key: 'value2' }];
    const result = prepareModifiedRequest(true, modifiedRequest);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([modifiedRequest]);
  });

  it('should return single array when requestIsAnArray is false and modifiedRequest is an array', () => {
    const modifiedRequest = [{ key: 'value1' }, { key: 'value2' }];
    const result = prepareModifiedRequest(false, modifiedRequest);

    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual(modifiedRequest);
  });
});
