import { BadRequestException, ForbiddenException, InternalServerErrorException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { GOVUK_NOTIFY } from '@ukef/constants';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosError, AxiosResponse } from 'axios';
import { PinoLogger } from 'nestjs-pino';
import { NotifyClient } from 'notifications-node-client';

import { PostEmailsRequestDto } from '../../modules/emails/dto/post-emails-request.dto';
import expectedPrepareUploadResponse from './examples/example-response-for-prepare-upload.json';
import expectedSendEmailsResponse from './examples/example-response-for-send-emails.json';
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
    file: 'mock-file-buffer',
  };

  const mockSendEmailResponse = { status: 201, data: expectedSendEmailsResponse };
  const mockPrepareUploadResponse = { status: 201, data: expectedPrepareUploadResponse };

  const sendEmailMethodMock = jest.spyOn(NotifyClient.prototype, 'sendEmail').mockImplementation(() => Promise.resolve(mockSendEmailResponse));

  const prepareUploadMethodMock = jest.spyOn(NotifyClient.prototype, 'prepareUpload').mockImplementation(() => Promise.resolve(mockPrepareUploadResponse));

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

    describe('when a file property is provided', () => {
      it('calls GOV.UK Notify client prepareUpload function with the correct arguments', async () => {
        const mockParams: PostEmailsRequestDto = {
          sendToEmailAddress,
          templateId,
          personalisation,
          reference,
          file: 'mock-file-buffer',
        };

        await service.sendEmail(govUkNotifyKey, mockParams);

        expect(prepareUploadMethodMock).toHaveBeenCalledTimes(1);
        expect(prepareUploadMethodMock).toHaveBeenCalledWith(mockParams.file, { confirmEmailBeforeDownload: true });
      });

      it('calls GOV.UK Notify client sendEmail function with the correct arguments', async () => {
        await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation, reference });

        expect(sendEmailMethodMock).toHaveBeenCalledTimes(1);

        const expectedPersonalisation = {
          ...personalisation,
          linkToFile: mockPrepareUploadResponse,
        };

        expect(sendEmailMethodMock).toHaveBeenCalledWith(templateId, sendToEmailAddress, { personalisation: expectedPersonalisation, reference });
      });
    });

    it('returns a 201 response from GOV.UK Notify when sending the email is successful', async () => {
      const response = await service.sendEmail(govUkNotifyKey, { sendToEmailAddress, templateId, personalisation });

      expect(response).toEqual({ status: 201, data: expectedSendEmailsResponse });
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
