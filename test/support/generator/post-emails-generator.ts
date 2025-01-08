import { GOVUK_NOTIFY } from '@ukef/constants';
import { PostEmailsResponseDto } from '@ukef/helper-modules/govuk-notify/dto/post-emails-response.dto';
import { PostEmailsRequestDto } from '@ukef/modules/emails/dto/post-emails-request.dto';

import { AbstractGenerator } from './abstract-generator';
import { RandomValueGenerator } from './random-value-generator';

export class PostEmailsGenerator extends AbstractGenerator<PostEmailsValues, GenerateResult, GenerateOptions> {
  constructor(protected readonly valueGenerator: RandomValueGenerator) {
    super(valueGenerator);
  }

  protected generateValues(): PostEmailsValues {
    const templateId = this.valueGenerator.base64string({ length: GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID });
    return {
      templateId,
      reference: `${templateId}-12345`,
      sendTransactionId: this.valueGenerator.string({ length: GOVUK_NOTIFY.FIELD_LENGTHS.TRANSACTION_ID }),
      serviceId: this.valueGenerator.string({ length: GOVUK_NOTIFY.FIELD_LENGTHS.SERVICE_ID }),
      fromEmail: this.valueGenerator.email(),
      toEmail: this.valueGenerator.email(),
      emailSubject: this.valueGenerator.sentence(),
      emailBody: this.valueGenerator.paragraph({ sentences: 3 }),
      personalisation: {
        firstName: this.valueGenerator.word(),
        lastName: this.valueGenerator.word(),
      },
    };
  }

  protected transformRawValuesToGeneratedValues(values: PostEmailsValues[], _options: GenerateOptions): GenerateResult {
    const requests: PostEmailsRequestDto[] = values.map((v) => ({
      templateId: v.templateId,
      sendToEmailAddress: v.toEmail,
      personalisation: v.personalisation,
    }));

    const mdmPath = '/api/v1/emails';
    const govUkDomain = this.valueGenerator.httpsUrl();

    const postEmailsResponse: PostEmailsResponseDto[] = values.map((v: PostEmailsValues) => ({
      status: 201,
      data: {
        content: {
          body: v.emailBody,
          from_email: v.fromEmail,
          subject: v.emailSubject,
          unsubscribe_link: null,
        },
        id: v.sendTransactionId,
        reference: v.reference,
        scheduled_for: null,
        template: {
          id: v.templateId,
          uri: `${govUkDomain}/services/${v.serviceId}'/templates/${v.templateId}`,
          version: 24,
        },
        uri: `${govUkDomain}/v2/notifications/${v.sendTransactionId}`,
      },
    }));

    return {
      requests,
      postEmailsResponse,
      mdmPath,
    };
  }
}

interface PostEmailsValues {
  templateId: string;
  reference: string;
  sendTransactionId: string;
  serviceId: string;
  fromEmail: string;
  toEmail: string;
  emailSubject: string;
  emailBody: string;
  personalisation: {
    firstName: string;
    lastName: string;
  };
}

type GenerateOptions = object;

interface GenerateResult {
  requests: PostEmailsRequestDto[];
  mdmPath: string;
  postEmailsResponse: PostEmailsResponseDto[];
}
