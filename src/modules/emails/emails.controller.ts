import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Headers,
  HttpStatus,
  InternalServerErrorException,
  ParseArrayPipe,
  Post,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
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
    status: HttpStatus.CREATED,
    description: 'Returns information about email transaction.',
    type: [PostEmailsResponseDto],
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiUnprocessableEntityResponse({
    description: 'No GOV.UK Notify response',
  })
  /**
   * Verify request and send email
   * @param {String} govUkNotifyKey
   * @param {PostEmailsRequestItemDto[]]} post email request
   *
   * @returns {Promise.<PostEmailsResponseDto>} GOV.UK Notify response
   *
   * @throws {BadRequestException}
   * @throws {UnauthorizedException}
   * @throws {ForbiddenException}
   * @throws {Error}
   * @throws {UnprocessableEntityException}
   * @throws {InternalServerErrorException}
   */
  postEmail(
    @Headers('govUkNotifyKey') govUkNotifyKey: string,
    @Body(new ParseArrayPipe({ items: PostEmailsRequestItemDto, optional: false })) body: PostEmailsRequestItemDto[],
  ): Promise<
    | PostEmailsResponseDto
    | BadRequestException
    | UnauthorizedException
    | ForbiddenException
    | Error
    | UnprocessableEntityException
    | InternalServerErrorException
  > {
    if (!govUkNotifyKey) {
      throw new BadRequestException('Header "govUkNotifyKey" is required');
    }
    if (!body?.length) {
      throw new BadRequestException('Request payload is empty');
    }
    return this.emailsService.sendEmail(govUkNotifyKey, body[0]);
  }
}
