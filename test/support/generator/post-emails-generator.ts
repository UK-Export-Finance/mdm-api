import { PostEmailRequestItemDto } from '@ukef/helper-modules/govuk-notify/dto/post-email-request.dto';
import { PostEmailResponseDto } from '@ukef/helper-modules/govuk-notify/dto/post-email-response.dto';

import { AbstractGenerator } from './abstract-generator';
import { RandomValueGenerator } from './random-value-generator';

export class PostEmailsGenerator extends AbstractGenerator<postEmailsValues, GenerateResult, GenerateOptions> {
  constructor(protected readonly valueGenerator: RandomValueGenerator) {
    super(valueGenerator);
  }

  protected generateValues(): postEmailsValues {
    const templateId = this.valueGenerator.string({ length: 20 });
    return {
      templateId,
      reference: `${templateId}-12345`,
      sendTransactionId: this.valueGenerator.string({ length: 20 }),
      serviceId: this.valueGenerator.string({ length: 20 }),
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

  protected transformRawValuesToGeneratedValues(values: postEmailsValues[], {}: GenerateOptions): GenerateResult {
    const request: PostEmailRequestItemDto[] = values.map((v) => ({
      templateId: v.templateId,
      sendToEmailAddress: v.toEmail,
      personalisation: v.personalisation,
    }));

    const mdmPath = '/api/v1/emails';
    const govUkDomain = this.valueGenerator.httpsUrl();

    const postEmailsResponse: PostEmailResponseDto[][] = values.map((v: postEmailsValues) => [
      {
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
      },
    ]);

    // const postEmailsMultipleResponse = postEmailsResponse.map((response) => response[0]);

    return {
      request,
      postEmailsResponse,
      mdmPath,
    };
  }
}

interface postEmailsValues {
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

interface GenerateOptions {}

interface GenerateResult {
  request: PostEmailRequestItemDto[];
  mdmPath: string;
  postEmailsResponse: PostEmailResponseDto[][];
}
