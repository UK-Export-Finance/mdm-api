/**
 * Regex patterns used only by test files.
 * These are exported as `REGEX.TEST.*` so test files never declare regex literals directly.
 *
 * Import usage:
 * import { REGEX } from '@ukef/constants/regex';
 * Usage: REGEX.TEST.ANY_VALUE
 */

/**
 * Any Value - Matches any sequence of characters.
 *
 * Used in get-int-config.helper.test.ts as an example of a non-string value (a RegExp instance)
 * when testing that non-string inputs are rejected.
 *
 * Examples:
 * - `anything` ✓
 * - `` (empty string) ✓
 */
const ANY_VALUE = /.*/;

/**
 * Simple Word - Matches the literal word `test`.
 *
 * Used in regex.helper.test.ts to verify that `regexToString` strips the leading
 * and trailing forward slashes from a simple regex with no special characters.
 *
 * Examples:
 * - `test` ✓
 *
 * Does not match:
 * - `tests` (extra trailing character not part of the match group tested)
 */
const SIMPLE_WORD = /test/;

/**
 * Word With Escaped Forward Slash - Matches `test/test` with an escaped forward slash.
 *
 * Used in regex.helper.test.ts to verify that `regexToString` escapes forward slashes
 * contained within the regex source.
 *
 * Examples:
 * - `test/test` ✓
 */
const WORD_WITH_ESCAPED_FORWARD_SLASH = /test\/test/;

/**
 * Name Validation Pattern - Matches strings without leading/trailing whitespace made up of
 * word characters, hyphens, dots, parentheses and internal spaces.
 *
 * Used in regex.helper.test.ts to verify that `regexToString` escapes back slashes
 * contained within the regex source.
 *
 * Examples:
 * - `John Smith` ✓
 * - `Smith-Jones (Ltd.)` ✓
 *
 * Does not match:
 * - ` leading space` (leading whitespace not allowed)
 * - `trailing space ` (trailing whitespace not allowed)
 */
const NAME_VALIDATION_PATTERN = /^(?!\s)[\w\-.()\s]+(?<![\s.])$/;

/**
 * Path Validation Pattern - Matches strings made up of word characters, hyphens, colons,
 * forward slashes, back slashes, parentheses and spaces.
 *
 * Used in regex.helper.test.ts to verify that `regexToString` escapes both forward
 * slashes and back slashes contained within the regex source.
 *
 * Examples:
 * - `C:\path\to/file (1)` ✓
 */
const PATH_VALIDATION_PATTERN = /^[\w\-:/\\()\s]+$/;

/**
 * ODS Stored Procedure Query - Matches the SQL statement used to call the ODS stored procedure.
 *
 * Used in ods-stored-procedure.service.test.ts to assert the query passed to the query runner.
 *
 * Examples:
 * - `DECLARE @output_body NVARCHAR(MAX);\nEXEC t_apim.sp_ODS_query @input_body=@0, @output_body=@output_body OUTPUT;\nSELECT @output_body as output_body` ✓
 */
const ODS_STORED_PROCEDURE_QUERY =
  /DECLARE @output_body NVARCHAR\(MAX\);\s*EXEC t_apim\.sp_ODS_query @input_body=@0, @output_body=@output_body OUTPUT;\s*SELECT @output_body as output_body\s*/;

export const TEST = {
  ANY_VALUE,
  SIMPLE_WORD,
  WORD_WITH_ESCAPED_FORWARD_SLASH,
  NAME_VALIDATION_PATTERN,
  PATH_VALIDATION_PATTERN,
  ODS_STORED_PROCEDURE_QUERY,
};
