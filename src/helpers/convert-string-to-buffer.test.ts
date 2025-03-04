import { convertStringToBuffer } from './convert-string-to-buffer';

describe('convertStringToBuffer', () => {
  it('should convert string to buffer type', () => {
    // Arrange
    const stringBuffer = '<Buffer 43 31 2c 43 32 2c 43 33 0a 41 2c 42 2c 43 0a 44 2c 45 2c 46 0a 31 2c 32 2c 33 0a 34 2c 35 2c 36 0a>';
    const expectedBuffer = Buffer.from([
      0x43, 0x31, 0x2c, 0x43, 0x32, 0x2c, 0x43, 0x33, 0x0a, 0x41, 0x2c, 0x42, 0x2c, 0x43, 0x0a, 0x44, 0x2c, 0x45, 0x2c, 0x46, 0x0a, 0x31, 0x2c, 0x32, 0x2c,
      0x33, 0x0a, 0x34, 0x2c, 0x35, 0x2c, 0x36, 0x0a,
    ]);

    // Act
    const result = convertStringToBuffer(stringBuffer);

    // Assert
    expect(result).toEqual(expectedBuffer);
  });

  it('should convert string to buffer type with extra whitespaces', () => {
    // Arrange
    const stringBuffer = '<Buffer 43 31 2c 43 32 2c    43 33 0a 41 2c 42 2c 43 0a 44 2c 45 2c 46 0a 31 2c 32 2c 33 0a 34 2c 35 2c 36 0a>';
    const expectedBuffer = Buffer.from([
      0x43, 0x31, 0x2c, 0x43, 0x32, 0x2c, 0x43, 0x33, 0x0a, 0x41, 0x2c, 0x42, 0x2c, 0x43, 0x0a, 0x44, 0x2c, 0x45, 0x2c, 0x46, 0x0a, 0x31, 0x2c, 0x32, 0x2c,
      0x33, 0x0a, 0x34, 0x2c, 0x35, 0x2c, 0x36, 0x0a,
    ]);

    // Act
    const result = convertStringToBuffer(stringBuffer);

    // Assert
    expect(result).toEqual(expectedBuffer);
  });

  it('should convert string to buffer type with no whitespaces', () => {
    // Arrange
    const stringBuffer = '<Buffer 43312c43322c43330a412c422c430a442c452c460a312c322c330a342c352c360a>';
    const expectedBuffer = Buffer.from([
      0x43, 0x31, 0x2c, 0x43, 0x32, 0x2c, 0x43, 0x33, 0x0a, 0x41, 0x2c, 0x42, 0x2c, 0x43, 0x0a, 0x44, 0x2c, 0x45, 0x2c, 0x46, 0x0a, 0x31, 0x2c, 0x32, 0x2c,
      0x33, 0x0a, 0x34, 0x2c, 0x35, 0x2c, 0x36, 0x0a,
    ]);

    // Act
    const result = convertStringToBuffer(stringBuffer);

    // Assert
    expect(result).toEqual(expectedBuffer);
  });

  it('should return empty buffer for an empty string', () => {
    // Arrange
    const stringBuffer = '<Buffer>';
    const expectedBuffer = Buffer.from([]);

    // Act
    const result = convertStringToBuffer(stringBuffer);

    // Assert
    expect(result).toEqual(expectedBuffer);
  });

  it('should throw an error for a non-string buffer', () => {
    // Act & Assert
    expect(() => convertStringToBuffer(null)).toThrow("Cannot read properties of null (reading 'replace')");
  });
});
