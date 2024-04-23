import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import expectedResponse = require('./examples/example-response-for-send-email.json');
import { BadRequestException, ForbiddenException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { NotifyClient } from 'notifications-node-client';

import { GovukNotifyService } from './govuk-notify.service';
jest.mock('notifications-node-client');

describe('GovukNotifyService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: GovukNotifyService;

  let sendEmailMethodMock;

  const govUkNotifyKey = valueGenerator.string({ length: 10 });
  const sendToEmailAddress = valueGenerator.email();
  const templateId = valueGenerator.string({ length: 10 });
  const errorMessage = valueGenerator.sentence();
  const personalisation = {
    firstName: valueGenerator.word(),
    surname: valueGenerator.word(),
    supplierName: valueGenerator.word(),
  };

  beforeEach(() => {
    jest.resetAllMocks();
    sendEmailMethodMock = jest.spyOn(NotifyClient.prototype, 'sendEmail').mockImplementation(() => Promise.resolve({ status: 201, data: expectedResponse }));
    service = new GovukNotifyService();
  });

  describe('sendEmail', () => {
    const generateNotifyError = (status: number, message: string) => {
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

    it('calls notify client constructor', async () => {
      await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(NotifyClient).toHaveBeenCalledTimes(1);
      expect(NotifyClient).toHaveBeenCalledWith(govUkNotifyKey);
    });

    it('calls notify client with the specified request', async () => {
      await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
    });

    it('returns successful response for the specified request', async () => {
      const response = await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(response).toEqual({ status: 201, data: expectedResponse });
    });

    it('calls notify client with the specified field `reference` and get successful response', async () => {
      const reference = valueGenerator.string({ length: 10 });
      const response = await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation, reference });

      expect(sendEmailMethodMock).toHaveBeenCalledWith(templateId, sendToEmailAddress, { personalisation, reference });
      expect(response).toEqual({ status: 201, data: expectedResponse });
    });

    it.each([
      {
        exceptionClass: BadRequestException,
        exceptionName: 'Bad Request Exception',
        error: 'Bad Request',
        status: 400,
      },
      {
        exceptionClass: UnauthorizedException,
        exceptionName: 'Unauthorized Exception',
        error: 'Unauthorized',
        status: 401,
      },
      {
        exceptionClass: ForbiddenException,
        exceptionName: 'Forbidden Exception',
        error: 'Forbidden',
        status: 403,
      },
    ])('handles notify client error response with status "$status"', async ({ exceptionClass, exceptionName, error, status }) => {
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.reject(generateNotifyError(status, errorMessage)));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(exceptionClass);
      await expect(resultPromise).rejects.toThrow(exceptionName);
      await expect(resultPromise).rejects.toHaveProperty('status', status);
      await expect(resultPromise).rejects.toHaveProperty('response', { message: [errorMessage], error, statusCode: status });
    });

    it('handles notify client error with unexpected status 900', async () => {
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.reject(generateNotifyError(900, errorMessage)));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(Error);
      await expect(resultPromise).rejects.toThrow(errorMessage);
      await expect(resultPromise).rejects.toHaveProperty('message', errorMessage);
      await expect(resultPromise).rejects.toHaveProperty('stack');
    });

    it('handles empty response from notify client', async () => {
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.resolve(''));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(UnprocessableEntityException);
      await expect(resultPromise).rejects.toThrow('No gov.uk response');
    });
  });
});
