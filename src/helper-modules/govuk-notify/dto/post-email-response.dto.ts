import { ApiProperty } from '@nestjs/swagger';

export class PostEmailResponseDataContent {
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
  })
  public unsubscribe_link: string | null;
}

export class PostEmailResponseDataTemplate {
  @ApiProperty({
    example: 'tmpl1234-1234-5678-9012-abcd12345678',
    description: "Notify's template id",
  })
  public id: string;

  @ApiProperty({
    example: 'https://api.notifications.service.gov.uk/services/abc12345-a123-4567-8901-123456789012/templates/tmpl1234-1234-5678-9012-abcd12345678',
    description: 'URL to get more information about template',
  })
  public uri: string;

  @ApiProperty({
    example: 5,
    description: 'Template version',
  })
  public version: number;
}

export class PostEmailResponseData {
  @ApiProperty({ type: PostEmailResponseDataContent })
  public content: PostEmailResponseDataContent;

  @ApiProperty({
    example: 'efd12345-1234-5678-9012-ee123456789f',
    description: "Notify's id for the status receipts",
  })
  public id: string;

  @ApiProperty({
    example: 'tmpl1234-1234-5678-9012-abcd12345678-1713346533467',
    description: 'Reference id you provided for this transaction',
  })
  public reference: string;

  @ApiProperty({
    example: null,
    description: "We don't schedule emails",
  })
  public scheduled_for: string | null;

  @ApiProperty({ type: PostEmailResponseDataTemplate })
  public template: PostEmailResponseDataTemplate;

  @ApiProperty({
    example: 'https://api.notifications.service.gov.uk/v2/notifications/efd12345-1234-5678-9012-ee123456789f',
    description: 'API location to get more information about this transaction',
  })
  public uri: string;
}
export class PostEmailResponseDto {
  @ApiProperty({
    example: 201,
    description: 'Http status code',
  })
  status: number;
  @ApiProperty({ type: PostEmailResponseData })
  data: PostEmailResponseData;
}
