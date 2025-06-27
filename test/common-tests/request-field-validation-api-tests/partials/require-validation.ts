import { prepareModifiedRequest } from '@ukef-test/support/helpers/request-field-validation-helper';
import request from 'supertest';

export interface RequiredFieldValidationApiTestOptions<RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem> {
  fieldName: RequestBodyItemKey;
  required?: boolean;
  pattern?: RegExp;
  enum?: any;
  typeNameForErrorMessages: string;
  generateFieldValueOfLength?: (length: number) => RequestBodyItem[RequestBodyItemKey];
  generateFieldValueThatDoesNotMatchEnum?: () => RequestBodyItem[RequestBodyItemKey];
  validRequestBody: RequestBodyItem[] | RequestBodyItem;
  makeRequest: (body: unknown | unknown[]) => request.Test;
  givenAnyRequestBodyWouldSucceed: () => void;
}

export function withRequiredFieldValidationApiTests<RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem>({
  fieldName: fieldNameSymbol,
  required,
  enum: theEnum,
  typeNameForErrorMessages,
  generateFieldValueThatDoesNotMatchEnum,
  validRequestBody,
  makeRequest,
  givenAnyRequestBodyWouldSucceed,
}: RequiredFieldValidationApiTestOptions<RequestBodyItem, RequestBodyItemKey>): void {
  const fieldName = fieldNameSymbol.toString();
  const requestIsAnArray = Array.isArray(validRequestBody);
  const requestBodyItem = requestIsAnArray ? validRequestBody[0] : validRequestBody;

  required = required ?? true;

  beforeEach(() => {
    givenAnyRequestBodyWouldSucceed();
  });

  describe(`${fieldName} is required validation`, () => {
    if (required) {
      const expectedRequiredFieldError =
        theEnum && generateFieldValueThatDoesNotMatchEnum
          ? `${fieldName} must be one of the following values: ${Object.values(theEnum).join(', ')}`
          : `${fieldName} must be ${typeNameForErrorMessages}`;

      it(`returns a 400 response if ${fieldName} is not provided`, async () => {
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
      it(`returns a 2xx response if ${fieldName} is not provided`, async () => {
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
