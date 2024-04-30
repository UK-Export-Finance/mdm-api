import { prepareModifiedRequest } from '@ukef-test/support/helpers/request-field-validation-helper';
import request from 'supertest';

export interface TypeFieldValidationApiTestOptions<RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem> {
  fieldName: RequestBodyItemKey;
  enum?: any;
  typeNameForErrorMessages: string;
  validRequestBody: RequestBodyItem[] | RequestBodyItem;
  makeRequest: ((body: unknown[]) => request.Test) | ((body: unknown) => request.Test);
  givenAnyRequestBodyWouldSucceed: () => void;
}

export function withTypeFieldValidationApiTests<RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem>({
  fieldName: fieldNameSymbol,
  typeNameForErrorMessages,
  validRequestBody,
  makeRequest,
  givenAnyRequestBodyWouldSucceed,
}: TypeFieldValidationApiTestOptions<RequestBodyItem, RequestBodyItemKey>): void {
  const fieldName = fieldNameSymbol.toString();
  const requestIsAnArray = Array.isArray(validRequestBody);
  const requestBodyItem = requestIsAnArray ? validRequestBody[0] : validRequestBody;

  beforeEach(() => {
    givenAnyRequestBodyWouldSucceed();
  });

  describe(`${fieldName} type validation`, () => {
    const testCases = [
      {
        typeName: 'a boolean',
        value: true,
      },
      {
        typeName: 'a number',
        value: 1,
      },
      {
        typeName: 'a string',
        value: 'a',
      },
      {
        typeName: 'an array',
        value: [1],
      },
      {
        typeName: 'an object',
        value: { a: 1 },
      },
    ].filter((testCase) => testCase.typeName !== typeNameForErrorMessages);

    it.each(testCases)(`returns a 400 response if ${fieldName} is $typeName`, async ({ value }) => {
      const requestWithWrongField = { ...requestBodyItem, [fieldNameSymbol]: value };
      const preparedRequestWithWrongField = prepareModifiedRequest(requestIsAnArray, requestWithWrongField);

      const { status, body } = await makeRequest(preparedRequestWithWrongField);

      expect(status).toBe(400);
      expect(body).toMatchObject({
        error: 'Bad Request',
        message: expect.arrayContaining([`${fieldName} must be ${typeNameForErrorMessages}`]),
        statusCode: 400,
      });
    });
  });
}
