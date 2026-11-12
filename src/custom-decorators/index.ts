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

/**
 * Custom decorator that validates the optional `file` property nested within a personalisation
 * object. The rest of the object is left untouched so arbitrary template variables are still
 * accepted.
 * @param {ValidationOptions} options - Validation options
 * @returns A property decorator function
 * @throws {Error} If `file` is present and is not a non-empty string
 */
export function IsValidPersonalisationFile(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidPersonalisationFile',
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: any) {
          if (value?.file === undefined) {
            return true;
          }

          return typeof value.file === 'string' && value.file.length > 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property}.file must be a non-empty string`;
        },
      },
    });
  };
}
