import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { NotifyClient } from 'notifications-node-client';

import { PostEmailsRequestItemDto } from '../../modules/emails/dto/post-emails-request.dto';
import { PostEmailsResponseDto } from './dto/post-emails-response.dto';

@Injectable()
export class GovukNotifyService {
  constructor(private readonly logger: PinoLogger) {}

  /**
   * Send email to one recipient using GOV.UK template id
   * @param {String} govUkNotifyKey
   * @param {PostEmailsRequestItemDto} post email request item
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
  async sendEmail(
    govUkNotifyKey: string,
    postEmailsRequestItem: PostEmailsRequestItemDto,
  ): Promise<
    | PostEmailsResponseDto
    | BadRequestException
    | UnauthorizedException
    | ForbiddenException
    | Error
    | UnprocessableEntityException
    | InternalServerErrorException
  > {
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
        this.logger.error(err);
        if (err?.response?.data?.errors[0].message) {
          switch (err.response.data.status_code) {
            case 400:
              throw new BadRequestException([err.response.data.errors[0].message]);
            case 401:
              throw new UnauthorizedException([err.response.data.errors[0].message]);
            case 403:
              throw new ForbiddenException([err.response.data.errors[0].message]);
            case 500:
              throw new InternalServerErrorException([err.response.data.errors[0].message]);
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
