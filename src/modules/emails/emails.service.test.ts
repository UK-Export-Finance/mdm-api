import { ConfigService } from '@nestjs/config';
import { PostEmailsGenerator } from '@ukef-test/support/generator/post-emails-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { GovukNotifyService } from '../../helper-modules/govuk-notify/govuk-notify.service';
import { EmailsService } from './emails.service';

jest.mock('@ukef/modules/informatica/informatica.service');

describe('EmailsService', () => {
  const valueGenerator = new RandomValueGenerator();

  let service: EmailsService;
  let configServiceGet: jest.Mock;
  let govukNotifyServiceSendEmail: jest.Mock;

  beforeEach(() => {
    const configService = new ConfigService();
    configServiceGet = jest.fn().mockReturnValue({ key: valueGenerator.word() });
    configService.get = configServiceGet;

    govukNotifyServiceSendEmail = jest.fn();
    const govukNotifyService = new GovukNotifyService();
    govukNotifyService.sendEmail = govukNotifyServiceSendEmail;
    resetAllWhenMocks();

    service = new EmailsService(govukNotifyService);
  });

  describe('sendEmail', () => {
    const govUkNotifyKey = valueGenerator.string({ length: 10 });
    const { request, postEmailsResponse } = new PostEmailsGenerator(valueGenerator).generate({
      numberToGenerate: 1,
    });

    it('returns email sent receipt from the backend service', async () => {
      when(govukNotifyServiceSendEmail).calledWith(govUkNotifyKey, request[0]).mockResolvedValueOnce(postEmailsResponse[0]);

      const response = await service.sendEmail(govUkNotifyKey, request[0]);

      expect(response).toEqual(postEmailsResponse[0]);
    });
  });
});
