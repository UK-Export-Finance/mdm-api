import { regexToString } from './regex.helper';

describe('regexToString', () => {
  it('replaces the leading and trailing forward slashes with an empty string', () => {
    // Arrange
    const regex = /test/;

    // Act
    const regexString = regexToString(regex);

    // Assert
    const expected = 'test';

    expect(regexString).toEqual(expected);
  });

  it('escapes regexp forward slashes inside a string', () => {
    // Arrange
    const regex = /test\/test/;

    // Act
    const regexString = regexToString(regex);

    // Assert
    const expected = 'test\\/test';

    expect(regexString).toEqual(expected);
  });

  it('escapes multiple back slashes inside a string', () => {
    // Arrange
    const regex = /^(?!\s)[\w\-.()\s]+(?<![\s.])$/;

    // Act
    const regexString = regexToString(regex);

    // Assert
    const expected = '^(?!\\s)[\\w\\-.()\\s]+(?<![\\s.])$';

    expect(regexString).toEqual(expected);
  });

  it('escapes forward slashes inside a string', () => {
    // Arrange
    const regex = /^[\w\-:/\\()\s]+$/;

    // Act
    const regexString = regexToString(regex);

    // Assert
    const expected = '^[\\w\\-:/\\\\()\\s]+$';

    expect(regexString).toEqual(expected);
  });
});
