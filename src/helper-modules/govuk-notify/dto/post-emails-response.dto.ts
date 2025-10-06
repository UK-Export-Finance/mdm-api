import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES } from '@ukef/constants';

export class PostEmailsResponseDataContent {
  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.EMAIL_BODY,
    description: 'Email body',
  })
  public body: string;

  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.FROM_EMAIL,
    description: "Sender's email address",
  })
  public from_email: string;

  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.EMAIL_SUBJECT,
    description: 'Email subject line',
  })
  public subject: string;

  @ApiProperty({
    example: null,
    description: 'Unsubscribe links are not used, so this field should always be null',
    nullable: true,
    required: false,
  })
  public unsubscribe_link: string | null;
}

export class PostEmailsResponseDataTemplate {
  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.TEMPLATE_ID,
    description: "Notify's template id",
  })
  public id: string;

  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.TEMPLATE_URI,
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
    example: EXAMPLES.GOVUK_NOTIFY.RESPONSE_ID,
    description: "Notify's transaction id",
  })
  public id: string;

  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.REFERENCE,
    description: 'Reference that was sent to GOV.UK Notify',
  })
  public reference: string;

  @ApiProperty({
    example: null,
    description: 'Email scheduling is not used, so this field should always be null',
    nullable: true,
    required: false,
  })
  public scheduled_for: string | null;

  @ApiProperty({ type: PostEmailsResponseDataTemplate })
  public template: PostEmailsResponseDataTemplate;

  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.RESPONSE_URI,
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
