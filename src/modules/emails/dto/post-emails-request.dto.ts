import { ApiProperty } from '@nestjs/swagger';
import { GOVUK_NOTIFY } from '@ukef/constants';
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export type PostEmailsRequestDto = PostEmailsRequestItemDto[];

export class PostEmailsRequestItemDto {
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
  // 100 characters is arbitrary max limit, GOV.UK Notify can accept references at least 400 characters long.
  @MaxLength(100)
  @ApiProperty({
    example: GOVUK_NOTIFY.EXAMPLES.REFERENCE,
    description: 'Reference for the email sent',
    required: false,
    nullable: true,
    minLength: 1,
    maxLength: 100,
  })
  readonly reference?: string | null;
}
