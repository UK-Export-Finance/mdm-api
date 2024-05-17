import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import expectedResponse = require('./examples/example-response-for-send-emails.json');
import { BadRequestException, ForbiddenException, InternalServerErrorException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { PinoLogger } from 'nestjs-pino';
import { NotifyClient } from 'notifications-node-client';

import { GovukNotifyService } from './govuk-notify.service';
jest.mock('notifications-node-client');

describe('GovukNotifyService', () => {
  const valueGenerator = new RandomValueGenerator();

  const govUkNotifyKey = valueGenerator.string({ length: 10 });
  const sendToEmailAddress = valueGenerator.email();
  const templateId = valueGenerator.string({ length: 10 });
  const errorMessage = valueGenerator.sentence();
  const reference = valueGenerator.base64string({ length: 32 });
  const personalisation = {
    firstName: valueGenerator.word(),
    surname: valueGenerator.word(),
    supplierName: valueGenerator.word(),
  };

  const sendEmailMethodMock = jest
    .spyOn(NotifyClient.prototype, 'sendEmail')
    .mockImplementation(() => Promise.resolve({ status: 201, data: expectedResponse }));
  const loggerMock = {} as PinoLogger;
  loggerMock.error = jest.fn();
  const service = new GovukNotifyService(loggerMock);

  beforeEach(() => {
    jest.clearAllMocks();
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

    it('calls GOV.UK Notify client constructor', async () => {
      await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(NotifyClient).toHaveBeenCalledTimes(1);
      expect(NotifyClient).toHaveBeenCalledWith(govUkNotifyKey);
    });

    it('calls GOV.UK Notify client sendEmail function', async () => {
      await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation, reference });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      expect(sendEmailMethodMock).toHaveBeenCalledWith(templateId, sendToEmailAddress, { personalisation, reference });
    });

    it('returns a 201 response from GOV.UK Notify', async () => {
      const response = await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(response).toEqual({ status: 201, data: expectedResponse });
    });

    it('calls GOV.UK Notify client with the specified field `reference` and returns a 201 response', async () => {
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
      {
        exceptionClass: InternalServerErrorException,
        exceptionName: 'Internal Server Error Exception',
        error: 'Internal Server Error',
        status: 500,
      },
    ])('throws exception $exceptionName for unexpected $status', async ({ exceptionClass, exceptionName, error, status }) => {
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.reject(generateNotifyError(status, errorMessage)));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(exceptionClass);
      await expect(resultPromise).rejects.toThrow(exceptionName);
      await expect(resultPromise).rejects.toHaveProperty('status', status);
      await expect(resultPromise).rejects.toHaveProperty('response', { message: [errorMessage], error, statusCode: status });
    });

    it('throws generic Error exception for unexpected status', async () => {
      const unexpectedStatus = valueGenerator.integer({ min: 900, max: 999 });
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.reject(generateNotifyError(unexpectedStatus, errorMessage)));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(Error);
      await expect(resultPromise).rejects.toThrow(errorMessage);
      await expect(resultPromise).rejects.toHaveProperty('message', errorMessage);
      await expect(resultPromise).rejects.toHaveProperty('stack');
    });

    it('throws exception UnprocessableEntityException for empty response from GOV.UK Notify client', async () => {
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.resolve(''));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(UnprocessableEntityException);
      await expect(resultPromise).rejects.toThrow('No GOV.UK Notify response');
    });
  });
});
