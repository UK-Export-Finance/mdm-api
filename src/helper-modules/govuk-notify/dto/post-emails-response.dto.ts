import { ApiProperty } from '@nestjs/swagger';
import { GOVUK_NOTIFY } from '@ukef/constants';

export class PostEmailsResponseDataContent {
  @ApiProperty({
    example:
      'Dear John Smith,\r\n\r\nThe status of your MIA for EuroStar has been updated.\r\n\r\n* Your bank reference: EuroStar bridge\r\n* Current status: Acknowledged\r\n* Previous status: Submitted\r\n* Updated by: Joe Bloggs (Joe.Bloggs@example.com)\r\n\r\nSign in to our service for more information: \r\nhttps://www.test.service.gov.uk/\r\n\r\nWith regards,\r\n\r\nThe Digital Trade Finance Service team\r\n\r\nEmail: test@test.gov.uk\r\nPhone: +44 (0)202 123 4567\r\nOpening times: Monday to Friday, 9am to 5pm (excluding public holidays)',
    description: 'Email text',
  })
  public body: string;

  @ApiProperty({
    example: 'test@notifications.service.gov.uk',
    description: 'Email is sent from this address',
  })
  public from_email: string;

  @ApiProperty({
    example: 'Status update: EuroStar bridge',
    description: 'Email subject line',
  })
  public subject: string;

  @ApiProperty({
    example: null,
    description: "we don't use unsubscribe links",
    nullable: true,
  })
  public unsubscribe_link: string | null;
}

export class PostEmailsResponseDataTemplate {
  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.TEMPLATE_ID,
    description: "Notify's template id",
  })
  public id: string;

  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.TEMPLATE_URI,
    description: 'URL to get more information about template',
  })
  public uri: string;

  @ApiProperty({
    example: 5,
    description: 'Template version',
  })
  public version: number;
}

export class PostEmailsResponseData {
  @ApiProperty({ type: PostEmailsResponseDataContent })
  public content: PostEmailsResponseDataContent;

  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.RESPONSE_ID,
    description: "Notify's id for the status receipts",
  })
  public id: string;

  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.REFERENCE,
    description: 'Reference id you provided for this transaction',
  })
  public reference: string;

  @ApiProperty({
    example: null,
    description: "We don't schedule emails",
    nullable: true,
  })
  public scheduled_for: string | null;

  @ApiProperty({ type: PostEmailsResponseDataTemplate })
  public template: PostEmailsResponseDataTemplate;

  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.RESPONSE_URI,
    description: 'API location to get more information about this transaction',
  })
  public uri: string;
}
export class PostEmailsResponseDto {
  @ApiProperty({
    example: 201,
    description: 'Http status code',
  })
  status: number;
  @ApiProperty({ type: PostEmailsResponseData })
  data: PostEmailsResponseData;
}
