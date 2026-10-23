import { mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('REDACT_STRINGS', () => {
  const environmentVariableName = 'APIM_INFORMATICA_PASSWORD';

  let originalProcessEnv: NodeJS.ProcessEnv;
  let originalCwd: string;
  let temporaryDirectory: string;

  beforeEach(() => {
    originalProcessEnv = process.env;
    originalCwd = process.cwd();
    jest.resetModules();
  });

  afterEach(() => {
    process.env = originalProcessEnv;
    process.chdir(originalCwd);
    rmSync(temporaryDirectory, { recursive: true, force: true });
  });

  it('redacts credentials that are only supplied via `.env`, and not already present in process.env when this module is first imported', async () => {
    // Arrange
    /**
     * Simulate the real-world scenario this file's `dotenv.config()` call guards against: the credential is not
     * already present in `process.env` (e.g. it has only been declared in a `.env` file), so it must be `dotenv`
     * reading that file - rather than something else already populating `process.env` - that makes it available
     * before `REDACT_STRINGS` is constructed. A real, disposable `.env` file is used (rather than mocking the
     * `dotenv` module) so this test exercises the exact mechanism the application relies on.
     */
    const credentialOnlyAvailableViaDotenv = 'test-credential-only-in-dotenv-file';

    temporaryDirectory = mkdtempSync(join(tmpdir(), 'redact-strings-constant-test-'));
    writeFileSync(join(temporaryDirectory, '.env'), `${environmentVariableName}=${credentialOnlyAvailableViaDotenv}\n`);

    process.env = {};
    process.chdir(temporaryDirectory);

    /**
     * A fresh dynamic import (after `jest.resetModules()`) re-executes the module's top-level code, including its
     * `dotenv.config()` call and the construction of `REDACT_STRINGS`, exactly as happens on application start-up.
     * `dotenv.config()` resolves `.env` relative to `process.cwd()`, which now points at the temporary directory.
     * The `.js` extension is required here (even though the source file is `.ts`): under the project's `nodenext`
     * module resolution, a dynamic `import()` is always resolved using Node's ESM algorithm, which requires explicit
     * extensions; `ts-jest`'s ESM support then maps this `.js` specifier back to the `.ts` source file at test time.
     */

    // Act
    const { REDACT_STRINGS } = await import('./redact-strings.constant.js');

    // Assert
    expect(REDACT_STRINGS).toContainEqual({ searchValue: credentialOnlyAvailableViaDotenv, replaceValue: '[Redacted]' });
  });
});
