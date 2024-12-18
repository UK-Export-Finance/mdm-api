import { ApiProperty } from '@nestjs/swagger';
import { GOVUK_NOTIFY } from '@ukef/constants';
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PostEmailsRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID)
  @MaxLength(GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID)
  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.TEMPLATE_ID,
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
    example: GOVUK_NOTIFY.EXAMPLES.EMAIL,
    description: 'Email address to send this email',
    required: true,
    nullable: false,
  })
  readonly sendToEmailAddress: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({
    example: { firstName: GOVUK_NOTIFY.EXAMPLES.FIRST_NAME },
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
    example: GOVUK_NOTIFY.EXAMPLES.REFERENCE,
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
  @MaxLength(400)
  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.FILE,
    description: `File for GovNotify to consume and generate a link to download with supported file types. The file size must be smaller than ${GOVUK_NOTIFY.FILE.SIZE.MAX}`,
    required: false,
    nullable: true,
    minLength: 1,
    maxLength: 400,
  })
  readonly file?: string | null;
}
