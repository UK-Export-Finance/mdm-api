import { regexToString } from './regex.helper';

describe('regexToString', () => {
  it('replaces the leading and trailing forward slashes with an empty string', () => {
    // Arrange
    const regex = /test/;

    // Act
    const regexString = regexToString(regex);

    // Assert
    expect(regexString).toBe('test');
    expect(new RegExp(regexString)).toEqual(regex);
  });

  it('escapes regexp forward slashes inside a string', () => {
    // Arrange
    const regex = /test\/test/;

    // Act
    const regexString = regexToString(regex);

    // Assert
    expect(regexString).toBe('test\\/test');
    expect(new RegExp(regexString)).toEqual(regex);
  });

  it('escapes multiple back slashes inside a string', () => {
    // Arrange
    const regex = /^(?!\s)[\w\-.()\s]+(?<![\s.])$/;

    // Act
    const regexString = regexToString(regex);

    // Assert
    expect(regexString).toBe('^(?!\\s)[\\w\\-.()\\s]+(?<![\\s.])$');
    expect(new RegExp(regexString)).toEqual(regex);
  });

  it('escapes forward slashes inside a string', () => {
    // Arrange
    const regex = /^[\w\-:/\\()\s]+$/;

    // Act
    const regexString = regexToString(regex);

    // Assert
    expect(regexString).toBe('^[\\w\\-:/\\\\()\\s]+$');
    expect(new RegExp(regexString)).toEqual(regex);
  });
});
