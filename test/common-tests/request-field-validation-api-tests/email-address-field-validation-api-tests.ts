import { prepareModifiedRequest } from '@ukef-test/support/helpers/request-field-validation-helper';

import { StringFieldValidationApiTestOptions, withStringFieldValidationApiTests } from './string-field-validation-api-tests';

export const withEmailFieldValidationApiTests = <RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem>({
  fieldName: fieldNameSymbol,
  length: lengthOption,
  minLength: minLengthOption,
  maxLength: maxLengthOption,
  required,
  pattern,
  enum: theEnum,
  typeNameForErrorMessages = 'an email',
  generateFieldValueThatDoesNotMatchEnum,
  generateFieldValueOfLength,
  generateFieldValueThatDoesNotMatchRegex,
  validRequestBody,
  makeRequest,
  givenAnyRequestBodyWouldSucceed,
}: StringFieldValidationApiTestOptions<RequestBodyItem, RequestBodyItemKey>): void => {
  withStringFieldValidationApiTests({
    fieldName: fieldNameSymbol,
    length: lengthOption,
    minLength: minLengthOption,
    maxLength: maxLengthOption,
    required,
    pattern,
    enum: theEnum,
    typeNameForErrorMessages,
    generateFieldValueThatDoesNotMatchEnum,
    generateFieldValueOfLength,
    generateFieldValueThatDoesNotMatchRegex,
    validRequestBody,
    makeRequest,
    givenAnyRequestBodyWouldSucceed,
  });

  const requestIsAnArray = Array.isArray(validRequestBody);
  const requestBodyItem = requestIsAnArray ? validRequestBody[0] : validRequestBody;
  const fieldName = fieldNameSymbol.toString();

  describe(`${fieldName} email specific validation`, () => {
    it.each([
      {
        invalidEmail: 'test@example',
        expectedError: 'sendToEmailAddress must be an email',
      },
      {
        invalidEmail: 'testexample.com',
        expectedError: 'sendToEmailAddress must be an email',
      },
      {
        invalidEmail: 'test@example.c',
        expectedError: 'sendToEmailAddress must be an email',
      },
    ])(`returns a 400 response if ${fieldName} is "$invalidEmail"`, async ({ invalidEmail, expectedError }) => {
      const requestWithInvalidValue = { ...requestBodyItem, [fieldNameSymbol]: invalidEmail };
      const preparedRequest = prepareModifiedRequest(requestIsAnArray, requestWithInvalidValue);

      const { status, body } = await makeRequest(preparedRequest);

      expect(status).toBe(400);
      expect(body).toMatchObject({
        error: 'Bad Request',
        message: expect.arrayContaining([expectedError]),
        statusCode: 400,
      });
    });
  });
};
