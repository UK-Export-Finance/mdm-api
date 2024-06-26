import { Chance } from 'chance';

interface Enum {
  [key: number | string]: string | number;
}
export class RandomValueGenerator {
  private static readonly seed = 0;
  private readonly chance: Chance.Chance;

  constructor() {
    this.chance = new Chance(RandomValueGenerator.seed);
  }

  boolean(): boolean {
    return this.chance.bool();
  }

  string(options?: { length?: number; minLength?: number; maxLength?: number }): string {
    const length = this.getStringLengthFromOptions(options);
    return this.chance.string({ length });
  }

  base64string(options?: { length?: number; minLength?: number; maxLength?: number }): string {
    const length = this.getStringLengthFromOptions(options);
    return this.chance.string({ length, pool: '0123456789abcdef' });
  }

  stringOfNumericCharacters(options?: { length?: number; minLength?: number; maxLength?: number }): string {
    const length = this.getStringLengthFromOptions(options);
    return this.chance.string({ length, pool: '0123456789' });
  }

  private getStringLengthFromOptions(options?: { length?: number; minLength?: number; maxLength?: number }): number {
    const minLength = options && (options.minLength || options.minLength === 0) ? options.minLength : 0;
    const maxLength = options && (options.maxLength || options.maxLength === 0) ? options.maxLength : Math.max(20, minLength * 2);
    const length = options && (options.length || options.length === 0) ? options.length : this.chance.integer({ min: minLength, max: maxLength });
    return length;
  }

  word(options?: { length?: number }): string {
    return this.chance.word({ length: options?.length });
  }

  sentence(options?: { words?: number }): string {
    return this.chance.sentence({ words: options?.words });
  }

  paragraph(options?: { sentences?: number }): string {
    return this.chance.paragraph({ sentences: options?.sentences });
  }

  httpsUrl(): string {
    return this.chance.url({ protocol: 'https' });
  }

  character(): string {
    return this.chance.character();
  }

  probabilityFloat(): number {
    return this.chance.floating({ min: 0, max: 1 });
  }

  nonnegativeFloat(options?: { max?: number; fixed?: number }): number {
    const min = 0;
    // Fixed is for number of decimal places.
    const fixed = options && options.fixed ? options.fixed : 2;
    return options && options.max ? this.chance.floating({ min, fixed: fixed, max: options.max }) : this.chance.floating({ min, fixed: fixed });
  }

  date(): Date {
    return this.chance.date();
  }

  integer({ min, max }: { min?: number; max?: number } = {}): number {
    return this.chance.integer({ min, max });
  }

  nonnegativeInteger({ max }: { max?: number } = {}): number {
    return this.integer({ min: 0, max });
  }

  email(): string {
    return this.chance.email();
  }

  postcode(): string {
    return this.chance.postcode();
  }

  enumValue<T = string>(theEnum: Enum): T {
    const possibleValues = Object.values(theEnum);
    return possibleValues[this.integer({ min: 0, max: possibleValues.length - 1 })] as T;
  }

  enumKey<T = string>(theEnum: Enum): T {
    const possibleValues = Object.keys(theEnum);
    return possibleValues[this.integer({ min: 0, max: possibleValues.length - 1 })] as T;
  }
}
