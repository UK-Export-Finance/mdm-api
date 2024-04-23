import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PostEmailRequestItemDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(40)
  @ApiProperty({ example: 'tmpl1234-1234-5678-9012-abcd12345678' })
  readonly templateId: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(7)
  @MaxLength(60)
  @ApiProperty({ example: 'john.tester@example.com', description: 'Email address to send this email' })
  readonly sendToEmailAddress: string;

  @IsObject()
  @IsOptional()
  @ApiProperty({ example: { firstName: 'John' }, description: 'All variables for email template' })
  readonly personalisation?: { [key: string]: string | number };

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(60)
  @ApiProperty({ example: 'tmpl1234-1234-5678-9012-abcd12345678-1713272155576' })
  readonly reference?: string;
}
