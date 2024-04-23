import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { NotifyClient } from 'notifications-node-client';

import { PostEmailRequestItemDto } from './dto/post-email-request.dto';
import { PostEmailResponseDto } from './dto/post-email-response.dto';

@Injectable()
export class GovukNotifyService {
  constructor() {}

  async sendEmail(govUkNotifyKey: string, email: PostEmailRequestItemDto): Promise<PostEmailResponseDto> {
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
      throw new UnprocessableEntityException('No gov.uk response');
    }

    const { status, data } = notifyResponse;
    return { status, data };
  }
}
