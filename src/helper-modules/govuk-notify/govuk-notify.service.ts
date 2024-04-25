import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { NotifyClient } from 'notifications-node-client';

import { PostEmailsRequestItemDto } from '../../modules/emails/dto/post-emails-request.dto';
import { PostEmailsResponseDto } from './dto/post-emails-response.dto';

@Injectable()
export class GovukNotifyService {
  constructor() {}

  async sendEmail(govUkNotifyKey: string, email: PostEmailsRequestItemDto): Promise<PostEmailsResponseDto> {
    // We create new client for each request because govUkNotifyKey (auth key) might be different.
    const notifyClient = new NotifyClient(govUkNotifyKey);
    const reference = email.reference || `${email.templateId}-${Date.now()}`;
    const notifyResponse = await notifyClient
      .sendEmail(email.templateId, email.sendToEmailAddress, {
        personalisation: email.personalisation,
        reference,
      })
      .then((response: any) => response)
      .catch((err) => {
        if (err?.response?.data?.errors[0].message) {
          switch (err.response.data.status_code) {
            case 400:
              throw new BadRequestException([err.response.data.errors[0].message]);
            case 401:
              throw new UnauthorizedException([err.response.data.errors[0].message]);
            case 403:
              throw new ForbiddenException([err.response.data.errors[0].message]);
            default:
              throw new Error(err.response.data.errors[0].message);
          }
        } else {
          throw new Error(JSON.stringify(err.response.data));
        }
      });

    if (!notifyResponse) {
      throw new UnprocessableEntityException('No GOV.UK Notify response');
    }

    const { status, data } = notifyResponse;
    return { status, data };
  }
}
