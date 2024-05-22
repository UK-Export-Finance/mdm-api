import { GOVUK_NOTIFY } from '@ukef/constants';
import { IncorrectAuthArg, withClientAuthenticationTests } from '@ukef-test/common-tests/client-authentication-api-tests';
import { withEmailFieldValidationApiTests } from '@ukef-test/common-tests/request-field-validation-api-tests/email-address-field-validation-api-tests';
import { withObjectFieldValidationApiTests } from '@ukef-test/common-tests/request-field-validation-api-tests/object-field-validation-api-tests';
import { withStringFieldValidationApiTests } from '@ukef-test/common-tests/request-field-validation-api-tests/string-field-validation-api-tests';
import { Api } from '@ukef-test/support/api';
import { PostEmailsGenerator } from '@ukef-test/support/generator/post-emails-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosError, AxiosResponse } from 'axios';
import nock from 'nock';
import { NotifyClient } from 'notifications-node-client';

describe('POST /emails', () => {
  const valueGenerator = new RandomValueGenerator();

  let api: Api;

  const govUkNotifyKey = valueGenerator.string({ length: 10 });
  const {
    mdmPath,
    requests: [request],
    postEmailsResponse,
  } = new PostEmailsGenerator(valueGenerator).generate({
    numberToGenerate: 2,
  });
  const errorMessage = valueGenerator.sentence();

  const sendEmailMethodMock = jest.spyOn(NotifyClient.prototype, 'sendEmail').mockImplementation(() => Promise.resolve(postEmailsResponse[0][0]));

  const generateNotifyError = (status: number, message?: string | null) => {
    const response = {
      data: {
        status_code: status,
        errors: [
          {
            error: valueGenerator.word(),
            message,
          },
        ],
      },
    } as AxiosResponse;
    return new AxiosError(`Request failed with status code ${status}`, status.toString(), null, null, response);
  };

  beforeAll(async () => {
    api = await Api.create();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await api.destroy();
  });

  afterEach(() => {
    nock.abortPendingRequests();
    nock.cleanAll();
  });

  withClientAuthenticationTests({
    givenTheRequestWouldOtherwiseSucceed: () => {
      jest.spyOn(NotifyClient.prototype, 'sendEmail').mockImplementation(() => Promise.resolve(postEmailsResponse[0][0]));
    },
    makeRequestWithoutAuth: (incorrectAuth?: IncorrectAuthArg) => api.postWithoutAuth(mdmPath, request, incorrectAuth?.headerName, incorrectAuth?.headerValue),
  });

  it('returns a 201 response with receipt for sent email', async () => {
    const { status, body } = await api.post(mdmPath, request, { govUkNotifyKey });

    expect(status).toBe(201);
    expect(body).toStrictEqual(postEmailsResponse[0][0]);
  });

  it('calls NotifyClient.sendEmail with the correct arguments', async () => {
    await api.post(mdmPath, request, { govUkNotifyKey });

    expect(sendEmailMethodMock).toHaveBeenCalledWith(
      request[0].templateId,
      request[0].sendToEmailAddress,
      expect.objectContaining({
        personalisation: request[0].personalisation,
        // Check if autogenerated `reference` matches expected pattern.
        // eslint-disable-next-line security/detect-non-literal-regexp
        reference: expect.stringMatching(new RegExp(`^${request[0].templateId}-\\d*$`)),
      }),
    );
  });

  it('calls NotifyClient.sendEmail with custom reference', async () => {
    const customReference = valueGenerator.string({ length: 10 });

    await api.post(mdmPath, [{ ...request[0], reference: customReference }], { govUkNotifyKey });

    expect(sendEmailMethodMock).toHaveBeenCalledWith(request[0].templateId, request[0].sendToEmailAddress, {
      personalisation: request[0].personalisation,
      reference: customReference,
    });
  });

  it('returns a 400 response if header `govUkNotifyKey` is missing', async () => {
    const { status, body } = await api.post(mdmPath, request);

    expect(status).toBe(400);
    expect(body).toStrictEqual({ error: 'Bad Request', message: 'Header "govUkNotifyKey" is required', statusCode: 400 });
  });

  it.each([
    {
      error: 'Bad Request',
      expectedStatus: 400,
    },
    {
      error: 'Unauthorized',
      expectedStatus: 401,
    },
    {
      error: 'Forbidden',
      expectedStatus: 403,
    },
  ])('returns a $expectedStatus response if the Notify client responds with status $expectedStatus', async ({ error, expectedStatus }) => {
    jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.reject(generateNotifyError(expectedStatus, errorMessage)));

    const { status, body } = await api.post(mdmPath, request, { govUkNotifyKey });

    expect(status).toBe(expectedStatus);
    expect(body).toMatchObject({
      error,
      message: expect.arrayContaining([errorMessage]),
      statusCode: expectedStatus,
    });
  });

  it('returns a 500 response if the Notify client responds with status 500', async () => {
    jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.reject(generateNotifyError(500)));

    const { status, body } = await api.post(mdmPath, request, { govUkNotifyKey });

    expect(status).toBe(500);
    expect(body).toStrictEqual({
      statusCode: 500,
      message: 'Internal server error',
    });
  });

  it(`returns a 400 response for empty payload`, async () => {
    const payload = '';
    const { status, body } = await api.post(mdmPath, payload, { govUkNotifyKey });

    expect(status).toBe(400);
    expect(body).toStrictEqual({
      statusCode: 400,
      error: 'Bad Request',
      message: 'Validation failed (parsable array expected)',
    });
  });

  it(`returns a 400 response for empty array`, async () => {
    const payload = [];
    const { status, body } = await api.post(mdmPath, payload, { govUkNotifyKey });

    expect(status).toBe(400);
    expect(body).toStrictEqual({  
      statusCode: 400,  
      error: 'Bad Request',  
      message: 'Request payload is empty',  
    });  
  });

  it(`returns a 400 response for broken json`, async () => {
    const payload = '[]';
    const { status, body } = await api.post(mdmPath, payload, { govUkNotifyKey });

    expect(status).toBe(400);
    expect(body).toStrictEqual({  
      statusCode: 400,  
      error: 'Bad Request',  
      message: 'Validation failed (parsable array expected)',  
    });  
  });

  describe('field validation', () => {
    withStringFieldValidationApiTests({
      fieldName: 'templateId',
      length: GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID,
      required: true,
      generateFieldValueOfLength: (length: number) => valueGenerator.string({ length }),
      validRequestBody: request,
      makeRequest: (body) => api.post(mdmPath, body, { govUkNotifyKey }),
      givenAnyRequestBodyWouldSucceed: () => {
        jest.spyOn(NotifyClient.prototype, 'sendEmail').mockImplementation(() => Promise.resolve(postEmailsResponse[0][0]));
      },
    });

    withEmailFieldValidationApiTests({
      fieldName: 'sendToEmailAddress',
      required: true,
      validRequestBody: request,
      makeRequest: (body) => api.post(mdmPath, body, { govUkNotifyKey }),
      givenAnyRequestBodyWouldSucceed: () => {
        jest.spyOn(NotifyClient.prototype, 'sendEmail').mockImplementation(() => Promise.resolve(postEmailsResponse[0][0]));
      },
    });

    withStringFieldValidationApiTests({
      fieldName: 'reference',
      minLength: 1,
      maxLength: 100,
      required: false,
      generateFieldValueOfLength: (length: number) => valueGenerator.string({ length }),
      validRequestBody: request,
      makeRequest: (body) => api.post(mdmPath, body, { govUkNotifyKey }),
      givenAnyRequestBodyWouldSucceed: () => {
        jest.spyOn(NotifyClient.prototype, 'sendEmail').mockImplementation(() => Promise.resolve(postEmailsResponse[0][0]));
      },
    });

    withObjectFieldValidationApiTests({
      fieldName: 'personalisation',
      required: false,
      validRequestBody: request,
      makeRequest: (body) => api.post(mdmPath, body, { govUkNotifyKey }),
      givenAnyRequestBodyWouldSucceed: () => {
        jest.spyOn(NotifyClient.prototype, 'sendEmail').mockImplementation(() => Promise.resolve(postEmailsResponse[0][0]));
      },
    });
  });
});
