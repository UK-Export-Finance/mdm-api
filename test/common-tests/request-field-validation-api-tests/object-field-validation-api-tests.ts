import { prepareModifiedRequest } from '@ukef-test/support/helpers/request-field-validation-helper';
import request from 'supertest';

export interface ObjectFieldValidationApiTests<RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem> {
  fieldName: RequestBodyItemKey;
  required?: boolean;
  validRequestBody: RequestBodyItem[] | RequestBodyItem;
  makeRequest: ((body: unknown[]) => request.Test) | ((body: unknown) => request.Test);
  givenAnyRequestBodyWouldSucceed: () => void;
}

export function withObjectFieldValidationApiTests<RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem>({
  fieldName: fieldNameSymbol,
  required,
  validRequestBody,
  makeRequest,
  givenAnyRequestBodyWouldSucceed,
}: ObjectFieldValidationApiTests<RequestBodyItem, RequestBodyItemKey>): void {
  const fieldName = fieldNameSymbol.toString();
  const requestIsAnArray = Array.isArray(validRequestBody);
  const requestBodyItem = requestIsAnArray ? validRequestBody[0] : validRequestBody;

  required = required ?? true;

  describe(`${fieldName} validation`, () => {
    beforeEach(() => {
      givenAnyRequestBodyWouldSucceed();
    });

    it(`returns a 400 response if ${fieldName} is number`, async () => {
      const requestWithNumberField = { ...requestBodyItem, [fieldNameSymbol]: 1 };
      const preparedRequestWithNumberField = prepareModifiedRequest(requestIsAnArray, requestWithNumberField);

      const { status, body } = await makeRequest(preparedRequestWithNumberField);

      expect(status).toBe(400);
      expect(body).toMatchObject({
        error: 'Bad Request',
        message: expect.arrayContaining([`${fieldName} must be an object`]),
        statusCode: 400,
      });
    });

    it(`returns a 400 response if ${fieldName} is string`, async () => {
      const requestWithStringField = { ...requestBodyItem, [fieldNameSymbol]: '' };
      const preparedRequestWithStringField = prepareModifiedRequest(requestIsAnArray, requestWithStringField);

      const { status, body } = await makeRequest(preparedRequestWithStringField);

      expect(status).toBe(400);
      expect(body).toMatchObject({
        error: 'Bad Request',
        message: expect.arrayContaining([`${fieldName} must be an object`]),
        statusCode: 400,
      });
    });

    it(`returns a 400 response if ${fieldName} is array`, async () => {
      const requestWithArrayField = { ...requestBodyItem, [fieldNameSymbol]: [] };
      const preparedRequestWithArrayField = prepareModifiedRequest(requestIsAnArray, requestWithArrayField);

      const { status, body } = await makeRequest(preparedRequestWithArrayField);

      expect(status).toBe(400);
      expect(body).toMatchObject({
        error: 'Bad Request',
        message: expect.arrayContaining([`${fieldName} must be an object`]),
        statusCode: 400,
      });
    });

    if (required) {
      it(`returns a 400 response if ${fieldName} is not present`, async () => {
        const { [fieldNameSymbol]: _removed, ...requestWithoutTheField } = requestBodyItem;
        const preparedRequestWithoutTheField = prepareModifiedRequest(requestIsAnArray, requestWithoutTheField);

        const { status, body } = await makeRequest(preparedRequestWithoutTheField);

        expect(status).toBe(400);
        expect(body).toMatchObject({
          error: 'Bad Request',
          message: expect.arrayContaining([`${fieldName} must be an object`]),
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
          message: expect.arrayContaining([`${fieldName} must be an object`]),
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
}
