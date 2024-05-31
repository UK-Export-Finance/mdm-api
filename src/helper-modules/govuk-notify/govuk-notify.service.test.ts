import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import expectedResponse = require('./examples/example-response-for-send-emails.json');
import { BadRequestException, ForbiddenException, InternalServerErrorException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { GOVUK_NOTIFY } from '@ukef/constants';
import { AxiosError, AxiosResponse } from 'axios';
import { PinoLogger } from 'nestjs-pino';
import { NotifyClient } from 'notifications-node-client';

import { GovukNotifyService } from './govuk-notify.service';
jest.mock('notifications-node-client');

describe('GovukNotifyService', () => {
  const valueGenerator = new RandomValueGenerator();
  const loggerError = jest.fn();

  const govUkNotifyKey = valueGenerator.string({ length: 10 });
  const sendToEmailAddress = valueGenerator.email();
  const templateId = valueGenerator.string({ length: GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID });
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
  const logger = new PinoLogger({});
  logger.error = loggerError;
  const service = new GovukNotifyService(logger);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    const generateNotifyError = (status: number, message?: string) => {
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

    it('calls GOV.UK Notify client constructor with the correct argument', async () => {
      await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(NotifyClient).toHaveBeenCalledTimes(1);
      expect(NotifyClient).toHaveBeenCalledWith(govUkNotifyKey);
    });

    it('calls GOV.UK Notify client sendEmail function with the correct arguments', async () => {
      await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation, reference });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      expect(sendEmailMethodMock).toHaveBeenCalledWith(templateId, sendToEmailAddress, { personalisation, reference });
    });

    it('returns a 201 response from GOV.UK Notify when sending the email is successful', async () => {
      const response = await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(response).toEqual({ status: 201, data: expectedResponse });
    });

    it.each([
      {
        exceptionClass: BadRequestException,
        status: 400,
      },
      {
        exceptionClass: UnauthorizedException,
        status: 401,
      },
      {
        exceptionClass: ForbiddenException,
        status: 403,
      },
      {
        exceptionClass: InternalServerErrorException,
        status: 500,
      },
    ])('throws exception $exceptionName for unexpected $status', async ({ exceptionClass, status }) => {
      const notifyError = generateNotifyError(status, errorMessage);
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.reject(notifyError));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(exceptionClass);
      await expect(resultPromise).rejects.toThrow(errorMessage);
      await expect(resultPromise).rejects.toHaveProperty('status', status);
      await expect(resultPromise).rejects.toHaveProperty('cause', notifyError);
      await expect(resultPromise).rejects.toHaveProperty('response', { message: errorMessage, statusCode: status });
      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith(notifyError);
    });

    it('throws generic Error exception for unexpected status', async () => {
      const unexpectedStatus = valueGenerator.integer({ min: 900, max: 999 });
      const notifyError = generateNotifyError(unexpectedStatus, errorMessage);
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.reject(notifyError));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(Error);
      await expect(resultPromise).rejects.toThrow(errorMessage);
      await expect(resultPromise).rejects.toHaveProperty('message', errorMessage);
      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith(notifyError);
    });

    it('throws generic Error exception for error without error message', async () => {
      const notifyError = generateNotifyError(400);
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.reject(notifyError));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(Error);
      await expect(resultPromise).rejects.toThrow('NotifyClient failed with unexpected error %o');
      await expect(resultPromise).rejects.toHaveProperty('message', 'NotifyClient failed with unexpected error %o');
      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith(notifyError);
    });

    it('throws exception UnprocessableEntityException for empty response from GOV.UK Notify client', async () => {
      jest.mocked(sendEmailMethodMock).mockImplementation(() => Promise.resolve(''));

      const resultPromise = service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);
      await expect(resultPromise).rejects.toBeInstanceOf(UnprocessableEntityException);
      await expect(resultPromise).rejects.toThrow('No GOV.UK Notify response');
      expect(loggerError).toHaveBeenCalledTimes(1);
      expect(loggerError).toHaveBeenCalledWith('Empty response from GOV.UK Notify');
    });
  });
});
