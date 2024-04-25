import { BadRequestException, Body, Controller, Headers, ParseArrayPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { PostEmailsResponseDto } from '@ukef/helper-modules/govuk-notify/dto/post-emails-response.dto';

import { PostEmailsRequestItemDto } from './dto/post-emails-request.dto';
import { EmailsService } from './emails.service';

@ApiTags('emails')
@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  @ApiOperation({
    summary: 'Send email using to GOV.UK Notify service',
  })
  @ApiBody({ type: [PostEmailsRequestItemDto] })
  @ApiCreatedResponse({
    status: 201,
    description: 'Returns information about email transaction.',
    type: [PostEmailsResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Unknown GOV.UK Notify error happened',
  })
  postEmail(
    @Headers('govUkNotifyKey') govUkNotifyKey: string,
    @Body(new ParseArrayPipe({ items: PostEmailsRequestItemDto, optional: false })) body: PostEmailsRequestItemDto[],
  ): Promise<PostEmailsResponseDto> {
    if (!govUkNotifyKey) {
      throw new BadRequestException(['govUkNotifyKey header is required']);
    }
    return this.emailsService.sendEmail(govUkNotifyKey, body[0]);
  }
}
