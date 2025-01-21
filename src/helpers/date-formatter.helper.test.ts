import { salesforceFormattedCurrentDate } from './date-formatter.helper';

describe('salesforceFormattedCurrentDate function', () => {
  const mockDate = new Date(2007, 3, 27);

  beforeEach(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return the current date, formatted correctly', () => {
    expect(salesforceFormattedCurrentDate()).toBe('2007-04-27');
  });
});
