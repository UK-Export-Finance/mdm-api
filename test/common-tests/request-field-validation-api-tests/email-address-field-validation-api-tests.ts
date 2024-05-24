import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { prepareModifiedRequest } from '@ukef-test/support/helpers/request-field-validation-helper';
import request from 'supertest';

import { withRequiredFieldValidationApiTests } from './partials/require-validation';
import { withTypeFieldValidationApiTests } from './partials/type-validation';

export interface EmailFieldValidationApiTestOptions<RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem> {
  fieldName: RequestBodyItemKey;
  required?: boolean;
  validRequestBody: RequestBodyItem[] | RequestBodyItem;
  makeRequest: (body: unknown | unknown[]) => request.Test;
  givenAnyRequestBodyWouldSucceed: () => void;
}

export const withEmailFieldValidationApiTests = <RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem>({
  fieldName: fieldNameSymbol,
  required,
  validRequestBody,
  makeRequest,
  givenAnyRequestBodyWouldSucceed,
}: EmailFieldValidationApiTestOptions<RequestBodyItem, RequestBodyItemKey>): void => {
  const valueGenerator = new RandomValueGenerator();
  const requestIsAnArray = Array.isArray(validRequestBody);
  const requestBodyItem = requestIsAnArray ? validRequestBody[0] : validRequestBody;
  const fieldName = fieldNameSymbol.toString();
  const typeNameForErrorMessages = 'an email';
  required = required ?? true;

  describe(`${fieldName} validation`, () => {
    beforeEach(() => {
      givenAnyRequestBodyWouldSucceed();
    });

    it(`returns a 2xx response if validRequestBody is provided`, async () => {
      const preparedRequest = prepareModifiedRequest(requestIsAnArray, requestBodyItem);

      const { status } = await makeRequest(preparedRequest);
      expect(status).toBeGreaterThanOrEqual(200);
      expect(status).toBeLessThan(300);
    });

    describe(`${fieldName} email specific validation`, () => {
      it.each([
        valueGenerator.email(),
        'test@example.uk',
        'test@example.co.uk',
        'test@example.com',
        'test@example.info',
        'test@example.london',
        'test@example.academy',
        'test@example.accountant',
        'test@example.accountants',
        'test@example.entertainment',
        'ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt@eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.entertainment',
      ])(`returns a 2xx response if ${fieldName} is correct email "%s"`, async (validEmail) => {
        const requestWithValidEmail = { ...requestBodyItem, [fieldNameSymbol]: validEmail };
        const preparedRequest = prepareModifiedRequest(requestIsAnArray, requestWithValidEmail);

        const { status } = await makeRequest(preparedRequest);

        expect(status).toBeGreaterThanOrEqual(200);
        expect(status).toBeLessThan(300);
      });

      it.each([
        'test@example',
        'testexample.com',
        'test@example.c',
        'ttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt@eeee.com',
        'tttt@eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.com',
      ])(`returns a 400 response if ${fieldName} is invalid email "%s"`, async (invalidEmail) => {
        const expectedError = `${fieldName} must be an email`;
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

    withRequiredFieldValidationApiTests({
      fieldName: fieldNameSymbol,
      required,
      validRequestBody,
      makeRequest,
      typeNameForErrorMessages,
      givenAnyRequestBodyWouldSucceed,
    });

    withTypeFieldValidationApiTests({
      fieldName: fieldNameSymbol,
      validRequestBody,
      makeRequest,
      typeNameForErrorMessages,
      givenAnyRequestBodyWouldSucceed,
    });
  });
};
