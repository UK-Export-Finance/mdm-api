import { BadRequestException } from '@nestjs/common';
import { PostEmailsGenerator } from '@ukef-test/support/generator/post-emails-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { when } from 'jest-when';

import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';

describe('EmailsController', () => {
  const valueGenerator = new RandomValueGenerator();
  const {
    requests: [request],
    postEmailsResponse,
  } = new PostEmailsGenerator(valueGenerator).generate({
    numberToGenerate: 1,
  });

  const emailsService = new EmailsService(null);
  const emailsServiceSendEmail = jest.fn();
  emailsService.sendEmail = emailsServiceSendEmail;

  const controller = new EmailsController(emailsService);

  it('should be defined', () => {
    expect(EmailsController).toBeDefined();
  });

  describe('sendEmail()', () => {
    const govUkNotifyKey = valueGenerator.string({ length: 10 });

    it('returns receipt response for sent email', async () => {
      when(emailsServiceSendEmail).calledWith(govUkNotifyKey, request[0]).mockResolvedValueOnce(postEmailsResponse[0]);

      const response = await controller.postEmail(govUkNotifyKey, request);

      expect(emailsServiceSendEmail).toHaveBeenCalledTimes(1);
      expect(response).toEqual(postEmailsResponse[0]);
    });

    it('throws BadRequestException exception if header govUkNotifyKey is missing', () => {
      const runTest = () => () => controller.postEmail(null, request);

      expect(runTest()).toThrow(BadRequestException);
      expect(runTest()).toThrow('Header "govUkNotifyKey" is required');
    });

    it('throws BadRequestException exception if body is empty array', () => {
      const runTest = () => () => controller.postEmail(govUkNotifyKey, []);

      expect(runTest()).toThrow(BadRequestException);
      expect(runTest()).toThrow('Request payload is empty');
    });

    it('throws BadRequestException exception if header govUkNotifyKey is missing and body is empty array', () => {
      const runTest = () => () => controller.postEmail(null, []);

      expect(runTest()).toThrow(BadRequestException);
      expect(runTest()).toThrow('Header "govUkNotifyKey" is required');
    });
  });
});
