import { salesforceFormattedCurrentDate } from './date-formatter.helper';

describe('salesforceFormattedCurrentDate', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Arrange
  const testCases = [
    { mockDate: new Date('2007-04-27T00:00:00Z'), expected: '2007-04-27' },
    { mockDate: new Date('2007-04-27'), expected: '2007-04-27' },
    { mockDate: new Date(2007, 3, 27), expected: '2007-04-27' },
    { mockDate: new Date('1970-01-01T12:34:56Z'), expected: '1970-01-01' },
    { mockDate: new Date('9999-12-31'), expected: '9999-12-31' },
    { mockDate: new Date('2020-02-29T00:00:00Z'), expected: '2020-02-29' }, // Leap year
  ];

  // Act & Assert
  test.each(testCases)('should format the date $input as $expected', ({ mockDate, expected }) => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    expect(salesforceFormattedCurrentDate()).toBe(expected);
  });
});
