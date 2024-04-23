import { Injectable } from '@nestjs/common';
import { PostEmailRequestItemDto } from '@ukef/helper-modules/govuk-notify/dto/post-email-request.dto';
import { PostEmailResponseDto } from '@ukef/helper-modules/govuk-notify/dto/post-email-response.dto';
import { GovukNotifyService } from '@ukef/helper-modules/govuk-notify/govuk-notify.service';

@Injectable()
export class EmailsService {
  constructor(private readonly govukNotifyService: GovukNotifyService) {}

  async sendEmail(govUkNotifyKey, postEmailRequestItem: PostEmailRequestItemDto): Promise<PostEmailResponseDto> {
    const response: PostEmailResponseDto = await this.govukNotifyService.sendEmail(govUkNotifyKey, postEmailRequestItem);
    return response;
  }
}
