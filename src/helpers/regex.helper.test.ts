import { regexToString } from './regex.helper';

describe('Regex Helper', () => {
  describe('regexToString', () => {
    it('replaces the leading and trailing forward slashes with an empty string', () => {
      const regex = /test/;
      const regexString = regexToString(regex);

      expect(regexString).toBe('test');
      expect(new RegExp(regexString)).toEqual(regex);
    });

    it('escapes regexp forward slashes inside a string', () => {
      const regex = /test\/test/;
      const regexString = regexToString(regex);

      expect(regexString).toBe('test\\/test');
      expect(new RegExp(regexString)).toEqual(regex);
    });

    it('escapes multiple back slashes inside a string', () => {
      const regex = /^(?!\s)[\w\-.()\s]+(?<![\s.])$/;
      const regexString = regexToString(regex);

      expect(regexString).toBe('^(?!\\s)[\\w\\-.()\\s]+(?<![\\s.])$');
      expect(new RegExp(regexString)).toEqual(regex);
    });

    it('escapes forward slashes inside a string', () => {
      const regex = /^[\w\-:/\\()\s]+$/;
      const regexString = regexToString(regex);

      expect(regexString).toBe('^[\\w\\-:/\\\\()\\s]+$');
      expect(new RegExp(regexString)).toEqual(regex);
    });
  });
});
