import { RandomValueGenerator } from './random-value-generator';

export abstract class AbstractGenerator<TRawValues, TGeneratedValues, TOptions> {
  constructor(protected readonly valueGenerator: RandomValueGenerator) {}

  generate(options: { numberToGenerate: number } & TOptions): TGeneratedValues {
    const values = Array(options.numberToGenerate)
      .fill(0)
      .map(() => this.generateValues());
    return this.transformRawValuesToGeneratedValues(values, options);
  }

  protected abstract generateValues(): TRawValues;

  protected abstract transformRawValuesToGeneratedValues(values: TRawValues[], options: TOptions): TGeneratedValues;
}
