import { PostEmailsGenerator } from '@ukef-test/support/generator/post-emails-generator';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { resetAllWhenMocks, when } from 'jest-when';

import { EmailsController } from './emails.controller';
import { EmailsService } from './emails.service';

describe('EmailsController', () => {
  let emailsServiceSendEmail: jest.Mock;

  let controller: EmailsController;

  const valueGenerator = new RandomValueGenerator();
  const {
    requests: [request],
    postEmailsResponse,
  } = new PostEmailsGenerator(valueGenerator).generate({
    numberToGenerate: 1,
  });

  beforeEach(() => {
    resetAllWhenMocks();
    const emailsService = new EmailsService(null);
    emailsServiceSendEmail = jest.fn();
    emailsService.sendEmail = emailsServiceSendEmail;

    controller = new EmailsController(emailsService);
  });

  it('should be defined', () => {
    expect(EmailsController).toBeDefined();
  });

  describe('sendEmail()', () => {
    const govUkNotifyKey = valueGenerator.string({ length: 10 });

    it('returns receipt response for sent email', async () => {
      when(emailsServiceSendEmail).calledWith(govUkNotifyKey, request[0]).mockResolvedValueOnce(postEmailsResponse[0]);

      const response = await controller.postEmail(govUkNotifyKey, request);

      expect(emailsServiceSendEmail).toHaveBeenCalled();
      expect(response).toEqual(postEmailsResponse[0]);
    });
  });
});
