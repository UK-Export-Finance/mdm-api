import { ApiProperty } from '@nestjs/swagger';
import { GOVUK_NOTIFY } from '@ukef/constants';
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export type PostEmailsRequestDto = PostEmailsRequestItemDto[];

export class PostEmailsRequestItemDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(40)
  @ApiProperty({ example: GOVUK_NOTIFY.EXAMPLES.TEMPLATE_ID })
  readonly templateId: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(60)
  @ApiProperty({ example: GOVUK_NOTIFY.EXAMPLES.EMAIL, description: 'Email address to send this email' })
  readonly sendToEmailAddress: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ example: { firstName: GOVUK_NOTIFY.EXAMPLES.FIRST_NAME }, description: 'All variables for email template' })
  readonly personalisation?: { [key: string]: string | number };

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  @ApiProperty({ example: GOVUK_NOTIFY.EXAMPLES.REFERENCE })
  readonly reference?: string;
}
