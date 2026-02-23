import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

/**
 * Custom decorator for exact length validation
 * @param {number} length - The exact length the value must be
 * @param {ValidationOptions} options - Validation options
 * @returns A property decorator function
 * @throws {Error} If the value is not a string or does not have the exact length
 */
export function ExactLength(length: number, options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ExactLength',
      target: object.constructor,
      propertyName,
      constraints: [length],
      options,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [required] = args.constraints;

          return typeof value === 'string' && value.length === required;
        },
        defaultMessage(args: ValidationArguments) {
          const { constraints, property } = args;

          const [required] = constraints;

          return `${property} must be exactly ${required} characters long`;
        },
      },
    });
  };
}
