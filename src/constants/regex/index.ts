/**
 * Central repository for all regex patterns used throughout the application.
 * All regex patterns are exported via a single REGEX object.
 *
 * Import usage:
 * import { REGEX } from '@ukef/constants/regex';
 * Usage: REGEX.COMPANIES_HOUSE_REGISTRATION_NUMBER
 *
 * Regex patterns used only by test files live in ./test and are exported as REGEX.TEST.*
 */

import { TEST } from './test';

/**
 * Companies House Registration Number - Matches valid UK Companies House registration numbers.
 *
 * Format: Prefix (2-3 chars) followed by 6-7 digits/letters
 * - Prefix can be: 2 letters, 1 letter + 1 digit, or 2 digits
 * - Main part: 6 digits OR 5 digits + 1 letter
 *
 * Examples:
 * - `12345678` ✓ (2 digits + 6 digits)
 * - `AB123456` ✓ (2 letters + 6 digits)
 * - `A1123456` ✓ (1 letter + 1 digit + 6 digits)
 * - `AB12345Z` ✓ (2 letters + 5 digits + 1 letter)
 *
 * Does not match:
 * - `1234567` (too few digits)
 * - `12345678901` (too many digits)
 * - `a1234567` (lowercase not allowed)
 */
const COMPANIES_HOUSE_REGISTRATION_NUMBER = /^(([A-Z]{2}|[A-Z]\d|\d{2})(\d{6}|\d{5}[A-Z]))$/;

/**
 * UK Postcode - Matches valid UK postcodes.
 *
 * Format: Area (1-2 chars) + District + Sector + Unit
 * - Area: 1-2 letters
 * - Next: 1 digit or 1 letter followed by digit (optional)
 * - Space (optional)
 * - 1 digit
 * - 2 letters (excluding C, I, K, M, O, V)
 *
 * Examples:
 * - `SW1A 1AA` ✓
 * - `B33 8TH` ✓
 * - `CR2 6XH` ✓
 * - `DN55 1PT` ✓
 *
 * Does not match:
 * - `INVALID` (not a valid postcode format)
 * - `SW1A 1CI` (contains invalid letter I)
 * - `123 456` (starts with numbers only)
 */
const UK_POSTCODE = /^[A-Za-z]{1,2}[\dRr][\dA-Za-z]?\s?\d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/;

/**
 * UKEF 10-Digit ID - Matches UKEF 10-digit identifiers (Deal, Facility).
 *
 * Format: Exactly 4 zeros followed by 8 digits
 * - Starts with: `00`
 * - Next 2 characters: 2 digits (00-99)
 * - Remaining: 6 digits (000000-999999)
 *
 * Examples:
 * - `0000000001` ✓
 * - `0000999999` ✓
 * - `0020123456` ✓ (with prefix)
 *
 * Does not match:
 * - `0000000000` (technically matches pattern but semantically invalid)
 * - `000000001` (only 9 digits)
 * - `00001234567` (11 digits)
 * - `1000000000` (doesn't start with 00)
 */
const TEN_DIGIT_UKEF_ID = /^00\d{8}$/;

/**
 * UKEF 8-Digit ID - Matches UKEF 8-digit identifiers (Party/Customer).
 *
 * Format: Exactly 8 digits
 *
 * Examples:
 * - `00000001` ✓
 * - `12345678` ✓
 * - `99999999` ✓
 *
 * Does not match:
 * - `1234567` (only 7 digits)
 * - `123456789` (9 digits)
 * - `1234567a` (contains letter)
 */
const EIGHT_DIGIT_UKEF_ID = /^\d{8}$/;

/**
 * Login Failed Message - Used for redacting login credentials in log messages.
 *
 * Pattern: Captures text between "Login failed for user '" and closing quote
 * - Matches: "Login failed for user '<anything>'"
 * - Replaces content between quotes with redacted value
 * - Uses global flag to replace all occurrences
 *
 * Examples:
 * - Input: `Login failed for user 'admin'` → `Login failed for user '[Redacted]'` ✓
 * - Input: `Login failed for user 'service-user'` → `Login failed for user '[Redacted]'` ✓
 * - Input: Multiple failures in same log → All instances redacted ✓
 *
 * Does not match:
 * - `User login failed` (different word order)
 * - `Login for user 'admin'` (missing "failed")
 */
const LOGIN_FAILED = /(Login failed for user ').*(')/g;

/**
 * Whitespace Pattern - Matches one or more whitespace characters.
 *
 * Used for removing whitespace from strings (e.g., hex string parsing)
 * - Matches: spaces, tabs, newlines, carriage returns
 * - Uses global flag to replace all occurrences
 *
 * Examples:
 * - Input: `68 65 6c 6c 6f` → `68656c6c6f` ✓
 * - Input: `hello   world` → `helloworld` ✓
 * - Input: `no  spaces` → `nospaces` ✓
 *
 * Does not match:
 * - Zero-width spaces or other invisible characters (only standard whitespace)
 */
const WHITESPACE = /\s+/g;

/**
 * Non-Digit Characters - Matches one or more characters that are not digits.
 *
 * Used for stripping non-digit characters from a string (e.g., extracting the numeric
 * part of an OECD risk category such as `"Category 1"`)
 * - Uses global flag to replace all occurrences
 *
 * Examples:
 * - Input: `Category 1` → `1` ✓
 * - Input: `abc123` → `123` ✓
 *
 * Does not match:
 * - Digits (0-9) themselves
 */
const NON_DIGIT_CHARACTERS = /\D/g;

/**
 * Eight To Ten Digit UKEF ID - Matches UKEF IDs of between 8 and 10 digits.
 *
 * Format: 8, 9 or 10 digits
 *
 * Examples:
 * - `00300524` ✓ (8 digits)
 * - `0020019715` ✓ (10 digits)
 *
 * Does not match:
 * - `1234567` (only 7 digits)
 * - `12345678901` (11 digits)
 * - `1234567a` (contains letter)
 */
const EIGHT_TO_TEN_DIGIT_UKEF_ID = /^\d{8,10}$/;

/**
 * Four Digit UKEF Sector ID - Matches UKEF Sector ids made up of exactly 4 digits.
 *
 * Format: Exactly 4 digits
 *
 * Examples:
 * - `1010` ✓
 *
 * Does not match:
 * - `101` (only 3 digits)
 * - `10100` (5 digits)
 */
const FOUR_DIGIT_UKEF_SECTOR_ID = /^\d{4}$/;

/**
 * Five Digit UKEF Industry ID - Matches UKEF Industry ids made up of exactly 5 digits.
 *
 * Format: Exactly 5 digits
 *
 * Examples:
 * - `02400` ✓
 *
 * Does not match:
 * - `0240` (only 4 digits)
 * - `024000` (6 digits)
 */
const FIVE_DIGIT_UKEF_INDUSTRY_ID = /^\d{5}$/;

export const REGEX = {
  COMPANIES_HOUSE_REGISTRATION_NUMBER,
  UK_POSTCODE,
  TEN_DIGIT_UKEF_ID,
  EIGHT_DIGIT_UKEF_ID,
  LOGIN_FAILED,
  WHITESPACE,
  NON_DIGIT_CHARACTERS,
  EIGHT_TO_TEN_DIGIT_UKEF_ID,
  FOUR_DIGIT_UKEF_SECTOR_ID,
  FIVE_DIGIT_UKEF_INDUSTRY_ID,
  TEST,
};
