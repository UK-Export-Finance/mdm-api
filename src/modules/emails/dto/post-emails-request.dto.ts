import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { EXAMPLES, GOVUK_NOTIFY } from '@ukef/constants';
import { IsValidPersonalisationFile } from '@ukef/custom-decorators';

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
  @IsValidPersonalisationFile()
  @ApiProperty({
    example: { firstName: EXAMPLES.GOVUK_NOTIFY.FIRST_NAME, file: EXAMPLES.GOVUK_NOTIFY.FILE },
    description: `All variables for email template. Include an optional \`file\` property to have GOV.UK Notify generate a secure download link, which replaces the \`((linkToFile))\` placeholder in the template. The file size must be smaller than ${GOVUK_NOTIFY.FILE.SIZE.MAX}.`,
    required: false,
    nullable: true,
  })
  readonly personalisation?: Personalisation | null;

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
}

export type Personalisation = Record<string, string | number | object> & {
  /** File for GOV.UK Notify to consume and convert into a secure `linkToFile` download link. */
  file?: string;
};
