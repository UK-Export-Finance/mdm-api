import request from 'supertest';

import { withRequiredFieldValidationApiTests } from './partials/require-validation';
import { withTypeFieldValidationApiTests } from './partials/type-validation';

export interface ObjectFieldValidationApiTests<RequestBodyItem, RequestBodyItemKey extends keyof RequestBodyItem> {
  fieldName: RequestBodyItemKey;
  required?: boolean;
  validRequestBody: RequestBodyItem[] | RequestBodyItem;
  makeRequest: (body: unknown | unknown[]) => request.Test;
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
  const typeNameForErrorMessages = 'an object';
  required = required ?? true;

  describe(`${fieldName} validation`, () => {
    beforeEach(() => {
      givenAnyRequestBodyWouldSucceed();
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
}
