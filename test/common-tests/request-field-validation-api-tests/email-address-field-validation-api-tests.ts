import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { prepareModifiedRequest } from '@ukef-test/support/helpers/request-field-validation-helper';
import request from 'supertest';

export interface EmailFieldValidationApiTestOptions<RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem> {
  fieldName: RequestBodyItemKey;
  required?: boolean;
  validRequestBody: RequestBodyItem[] | RequestBodyItem;
  makeRequest: ((body: unknown[]) => request.Test) | ((body: unknown) => request.Test);
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
  const validEmail = valueGenerator.email();
  const typeNameForErrorMessages = 'an email';
  required = required ?? true;

  describe(`${fieldName} validation`, () => {
    beforeEach(() => {
      givenAnyRequestBodyWouldSucceed();
    });

    it(`returns a 2xx response validRequestBody is provided`, async () => {
      const preparedRequest = prepareModifiedRequest(requestIsAnArray, requestBodyItem);

      const { status } = await makeRequest(preparedRequest);
      expect(status).toBeGreaterThanOrEqual(200);
      expect(status).toBeLessThan(300);
    });

    describe(`${fieldName} email specific validation`, () => {
      it(`returns a 2xx response if ${fieldName} is correct email is "${validEmail}"`, async () => {
        const requestWithInvalidValue = { ...requestBodyItem, [fieldNameSymbol]: validEmail };
        const preparedRequest = prepareModifiedRequest(requestIsAnArray, requestWithInvalidValue);

        const { status } = await makeRequest(preparedRequest);

        expect(status).toBeGreaterThanOrEqual(200);
        expect(status).toBeLessThan(300);
      });

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

    describe(`${fieldName} type validation`, () => {
      it(`returns a 400 response if ${fieldName} is number`, async () => {
        const requestWithNumberField = { ...requestBodyItem, [fieldNameSymbol]: 1 };
        const preparedRequestWithNumberField = prepareModifiedRequest(requestIsAnArray, requestWithNumberField);

        const { status, body } = await makeRequest(preparedRequestWithNumberField);

        expect(status).toBe(400);
        expect(body).toMatchObject({
          error: 'Bad Request',
          message: expect.arrayContaining([`${fieldName} must be ${typeNameForErrorMessages}`]),
          statusCode: 400,
        });
      });

      it(`returns a 400 response if ${fieldName} is array`, async () => {
        const requestWithArrayField = { ...requestBodyItem, [fieldNameSymbol]: [''] };
        const preparedRequestWithArrayField = prepareModifiedRequest(requestIsAnArray, requestWithArrayField);

        const { status, body } = await makeRequest(preparedRequestWithArrayField);

        expect(status).toBe(400);
        expect(body).toMatchObject({
          error: 'Bad Request',
          message: expect.arrayContaining([`${fieldName} must be ${typeNameForErrorMessages}`]),
          statusCode: 400,
        });
      });
    });

    describe(`${fieldName} is required validation`, () => {
      if (required) {
        const expectedRequiredFieldError = `${fieldName} must be ${typeNameForErrorMessages}`;

        it(`returns a 400 response if ${fieldName} is not present`, async () => {
          const { [fieldNameSymbol]: _removed, ...requestWithoutTheField } = requestBodyItem;
          const preparedRequestWithoutTheField = prepareModifiedRequest(requestIsAnArray, requestWithoutTheField);

          const { status, body } = await makeRequest(preparedRequestWithoutTheField);

          expect(status).toBe(400);
          expect(body).toMatchObject({
            error: 'Bad Request',
            message: expect.arrayContaining([expectedRequiredFieldError]),
            statusCode: 400,
          });
        });

        it(`returns a 400 response if ${fieldName} is null`, async () => {
          const requestWithNullField = { ...requestBodyItem, [fieldNameSymbol]: null };
          const preparedRequestWithNullField = prepareModifiedRequest(requestIsAnArray, requestWithNullField);

          const { status, body } = await makeRequest(preparedRequestWithNullField);

          expect(status).toBe(400);
          expect(body).toMatchObject({
            error: 'Bad Request',
            message: expect.arrayContaining([expectedRequiredFieldError]),
            statusCode: 400,
          });
        });
      } else {
        it(`returns a 2xx response if ${fieldName} is not present`, async () => {
          const { [fieldNameSymbol]: _removed, ...requestWithField } = requestBodyItem;
          const preparedRequestWithField = prepareModifiedRequest(requestIsAnArray, requestWithField);

          const { status } = await makeRequest(preparedRequestWithField);

          expect(status).toBeGreaterThanOrEqual(200);
          expect(status).toBeLessThan(300);
        });

        it(`returns a 2xx response if ${fieldName} is null`, async () => {
          const requestWithNullField = { ...requestBodyItem, [fieldNameSymbol]: null };
          const preparedRequestWithNullField = prepareModifiedRequest(requestIsAnArray, requestWithNullField);

          const { status } = await makeRequest(preparedRequestWithNullField);

          expect(status).toBeGreaterThanOrEqual(200);
          expect(status).toBeLessThan(300);
        });
      }
    });
  });
};
