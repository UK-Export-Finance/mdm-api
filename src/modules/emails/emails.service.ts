import { Injectable } from '@nestjs/common';
import { PostEmailsResponseDto } from '@ukef/helper-modules/govuk-notify/dto/post-emails-response.dto';
import { GovukNotifyService } from '@ukef/helper-modules/govuk-notify/govuk-notify.service';
import { PostEmailsRequestItemDto } from '@ukef/modules/emails/dto/post-emails-request.dto';

@Injectable()
export class EmailsService {
  constructor(private readonly govukNotifyService: GovukNotifyService) {}

  async sendEmail(govUkNotifyKey, postEmailRequestItem: PostEmailsRequestItemDto): Promise<PostEmailsResponseDto> {
    const response: PostEmailsResponseDto = await this.govukNotifyService.sendEmail(govUkNotifyKey, postEmailRequestItem);
    return response;
  }
}
