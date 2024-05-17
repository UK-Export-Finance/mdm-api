import { PostEmailsGenerator } from '@ukef-test/support/generator/post-emails-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { when } from 'jest-when';
import { PinoLogger } from 'nestjs-pino';

import { GovukNotifyService } from '../../helper-modules/govuk-notify/govuk-notify.service';
import { EmailsService } from './emails.service';

describe('EmailsService', () => {
  const valueGenerator = new RandomValueGenerator();

  const loggerMock = {} as PinoLogger;
  loggerMock.error = jest.fn();

  const govukNotifyServiceSendEmail = jest.fn();
  const govukNotifyService = new GovukNotifyService(loggerMock);
  govukNotifyService.sendEmail = govukNotifyServiceSendEmail;
  const service = new EmailsService(govukNotifyService);

  describe('sendEmail', () => {
    const govUkNotifyKey = valueGenerator.string();
    const {
      requests: [request],
      postEmailsResponse,
    } = new PostEmailsGenerator(valueGenerator).generate({
      numberToGenerate: 1,
    });

    it('returns email sent receipt from the backend service', async () => {
      when(govukNotifyServiceSendEmail).calledWith(govUkNotifyKey, request[0]).mockResolvedValueOnce(postEmailsResponse[0]);

      const response = await service.sendEmail(govUkNotifyKey, request[0]);

      expect(response).toEqual(postEmailsResponse[0]);
    });
  });
});
