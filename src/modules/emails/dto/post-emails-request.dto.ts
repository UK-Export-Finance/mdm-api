import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLES, GOVUK_NOTIFY } from '@ukef/constants';
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PostEmailsRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID)
  @MaxLength(GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID)
  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.TEMPLATE_ID,
    description: 'The GOV.UK Notify ID corresponding to the email template',
    required: true,
    nullable: false,
    minLength: GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID,
    maxLength: GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID,
  })
  readonly templateId: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.EMAIL,
    description: 'Email address to send this email',
    required: true,
    nullable: false,
  })
  readonly sendToEmailAddress: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({
    example: { firstName: EXAMPLES.GOVUK_NOTIFY.FIRST_NAME },
    description: 'All variables for email template',
    required: false,
    nullable: true,
  })
  readonly personalisation?: { [key: string]: string | number } | null;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(400)
  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.REFERENCE,
    description: 'Reference for the email sent',
    required: false,
    nullable: true,
    minLength: 1,
    maxLength: 400,
  })
  readonly reference?: string | null;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @ApiProperty({
    example: EXAMPLES.GOVUK_NOTIFY.FILE,
    description: `File for GovNotify to consume and generate a link to download with supported file types. The file size must be smaller than ${GOVUK_NOTIFY.FILE.SIZE.MAX}`,
    required: false,
    nullable: true,
    minLength: 1,
  })
  readonly file?: string | null;
}
