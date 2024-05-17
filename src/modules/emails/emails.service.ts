import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PostEmailsResponseDto } from '@ukef/helper-modules/govuk-notify/dto/post-emails-response.dto';
import { GovukNotifyService } from '@ukef/helper-modules/govuk-notify/govuk-notify.service';
import { PostEmailsRequestItemDto } from '@ukef/modules/emails/dto/post-emails-request.dto';

@Injectable()
export class EmailsService {
  constructor(private readonly govukNotifyService: GovukNotifyService) {}

  sendEmail(
    govUkNotifyKey: string,
    postEmailRequestItem: PostEmailsRequestItemDto,
  ): Promise<
    | PostEmailsResponseDto
    | BadRequestException
    | UnauthorizedException
    | ForbiddenException
    | Error
    | UnprocessableEntityException
    | InternalServerErrorException
  > {
    return this.govukNotifyService.sendEmail(govUkNotifyKey, postEmailRequestItem);
  }
}
