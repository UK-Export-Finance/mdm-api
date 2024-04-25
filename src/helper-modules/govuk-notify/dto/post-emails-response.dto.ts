import { ApiProperty } from '@nestjs/swagger';
import { GOVUK_NOTIFY } from '@ukef/constants';

export class PostEmailsResponseDataContent {
  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.EMAIL_BODY,
    description: 'Email text',
  })
  public body: string;

  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.FROM_EMAIL,
    description: 'Email is sent from this address',
  })
  public from_email: string;

  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.EMAIL_SUBJECT,
    description: 'Email subject line',
  })
  public subject: string;

  @ApiProperty({
    example: null,
    description: 'Unsubscribe links are not used',
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
    description: "Notify's URL to get more information about template",
  })
  public uri: string;

  @ApiProperty({
    example: 5,
    description: "Notify's template version",
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
    description: 'Email scheduling is not used',
    nullable: true,
  })
  public scheduled_for: string | null;

  @ApiProperty({ type: PostEmailsResponseDataTemplate })
  public template: PostEmailsResponseDataTemplate;

  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.RESPONSE_URI,
    description: "Notify's URL to get more information about this transaction",
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
