import { BadRequestException, Body, Controller, Headers, ParseArrayPipe, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { PostEmailRequestItemDto } from '@ukef/helper-modules/govuk-notify/dto/post-email-request.dto';
import { PostEmailResponseDto } from '@ukef/helper-modules/govuk-notify/dto/post-email-response.dto';

import { EmailsService } from './emails.service';

@ApiTags('emails')
@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  @ApiOperation({
    summary: 'Send email using to Gov.uk notify service',
  })
  @ApiBody({ type: [PostEmailRequestItemDto] })
  @ApiCreatedResponse({
    status: 201,
    description: 'Returns information about email transaction.',
    type: [PostEmailResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Returned if unknown gov.uk notify error happened',
  })
  postEmail(
    @Headers('govUkNotifyKey') govUkNotifyKey: string,
    @Body(new ParseArrayPipe({ items: PostEmailRequestItemDto, optional: false })) body: PostEmailRequestItemDto[],
  ): Promise<PostEmailResponseDto> {
    if (!govUkNotifyKey) {
      throw new BadRequestException(['govUkNotifyKey header is required']);
    }
    return this.emailsService.sendEmail(govUkNotifyKey, body[0]);
  }
}
