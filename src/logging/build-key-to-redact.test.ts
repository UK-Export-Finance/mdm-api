import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { buildKeyToRedact } from './build-key-to-redact';

describe('buildKeyToRedact', () => {
  const valueGenerator = new RandomValueGenerator();
  const part1 = valueGenerator.string();
  const part2 = valueGenerator.string();
  const part3 = valueGenerator.string();

  it('returns an empty string if there are no parts to build', () => {
    const keyToRedact = buildKeyToRedact([]);

    expect(keyToRedact).toBe('');
  });

  it('returns the string in the format ["<part>"] if there is only 1 part to build', () => {
    const keyToRedact = buildKeyToRedact([part1]);

    expect(keyToRedact).toBe(`["${part1}"]`);
  });

  it('returns the parts joined in the format ["<part1>"]["<part2>"] if there are 2 parts', () => {
    const keyToRedact = buildKeyToRedact([part1, part2]);

    expect(keyToRedact).toBe(`["${part1}"]["${part2}"]`);
  });

  it('returns the parts joined in the format ["<part1>"]["<part2>"]<etc.> if there are more than 2 parts', () => {
    const keyToRedact = buildKeyToRedact([part1, part2, part3]);

    expect(keyToRedact).toBe(`["${part1}"]["${part2}"]["${part3}"]`);
  });
});
