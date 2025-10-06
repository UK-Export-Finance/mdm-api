import { BadRequestException, Body, Controller, Headers, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { PostEmailsResponseDto } from '@ukef/helper-modules/govuk-notify/dto/post-emails-response.dto';

import { PostEmailsRequestDto } from './dto/post-emails-request.dto';
import { EmailsService } from './emails.service';

@ApiTags('emails')
@Controller('emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post()
  @ApiOperation({
    summary: 'Send email using GOV.UK Notify service',
  })
  @ApiBody({ type: PostEmailsRequestDto })
  @ApiCreatedResponse({
    description: 'Returns information about email transaction.',
    type: PostEmailsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
  @ApiUnprocessableEntityResponse({
    description: 'No GOV.UK Notify response',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  /**
   * Verify request and send email
   * @param {string} govUkNotifyKey
   * @param {PostEmailsRequestDto} body
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
  postEmail(@Headers('govUkNotifyKey') govUkNotifyKey: string, @Body() body: PostEmailsRequestDto): Promise<PostEmailsResponseDto> {
    if (!govUkNotifyKey) {
      throw new BadRequestException('Header "govUkNotifyKey" is required');
    }
    return this.emailsService.sendEmail(govUkNotifyKey, body);
  }
}
