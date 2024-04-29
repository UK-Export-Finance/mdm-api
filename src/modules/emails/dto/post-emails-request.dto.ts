import { ApiProperty } from '@nestjs/swagger';
import { GOVUK_NOTIFY } from '@ukef/constants';
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export type PostEmailsRequestDto = PostEmailsRequestItemDto[];

export class PostEmailsRequestItemDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID)
  @MaxLength(GOVUK_NOTIFY.FIELD_LENGTHS.TEMPLATE_ID)
  @ApiProperty({ example: GOVUK_NOTIFY.EXAMPLES.TEMPLATE_ID })
  readonly templateId: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: GOVUK_NOTIFY.EXAMPLES.EMAIL, description: 'Email address to send this email' })
  readonly sendToEmailAddress: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ example: { firstName: GOVUK_NOTIFY.EXAMPLES.FIRST_NAME }, description: 'All variables for email template' })
  readonly personalisation?: { [key: string]: string | number };

  @IsString()
  @IsOptional()
  @MinLength(1)
  // 100 characters is arbitrary Max limit, GOV.UK Notify can accept references atleast 400 characters long.
  @MaxLength(100)
  @ApiProperty({ example: GOVUK_NOTIFY.EXAMPLES.REFERENCE })
  readonly reference?: string;
}
