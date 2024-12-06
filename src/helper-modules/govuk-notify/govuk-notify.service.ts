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

import { PostEmailsRequestDto } from '../../modules/emails/dto/post-emails-request.dto';
import { PostEmailsResponseDto } from './dto/post-emails-response.dto';

@Injectable()
export class GovukNotifyService {
  constructor(private readonly logger: PinoLogger) {}

  /**
   * Send email to one recipient using GOV.UK template id
   * @param {String} govUkNotifyKey
   * @param {PostEmailsRequestDto} postEmailsRequest
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
  async sendEmail(govUkNotifyKey: string, postEmailsRequest: PostEmailsRequestDto): Promise<PostEmailsResponseDto> {
    // We create new client for each request because govUkNotifyKey (auth key) might be different.
    const notifyClient = new NotifyClient(govUkNotifyKey);

    const reference = postEmailsRequest.reference || `${postEmailsRequest.templateId}-${Date.now()}`;

    const { personalisation } = postEmailsRequest;

    if (postEmailsRequest.file) {
      personalisation.linkToFile = await notifyClient.prepareUpload(postEmailsRequest.file, { confirmEmailBeforeDownload: true });
    }

    const notifyResponse = await notifyClient
      .sendEmail(postEmailsRequest.templateId, postEmailsRequest.sendToEmailAddress, {
        personalisation: postEmailsRequest.personalisation,
        reference,
      })
      .then((response: any) => response)
      .catch((err) => {
        this.logger.error(err);
        if (err?.response?.data?.errors[0].message) {
          switch (err.response.data.status_code) {
            case 400:
              throw new BadRequestException(err.response.data.errors[0].message, { cause: err });
            case 401:
              throw new UnauthorizedException(err.response.data.errors[0].message, { cause: err });
            case 403:
              throw new ForbiddenException(err.response.data.errors[0].message, { cause: err });
            case 500:
              throw new InternalServerErrorException(err.response.data.errors[0].message, { cause: err });
            default:
              throw new Error(err.response.data.errors[0].message, { cause: err });
          }
        } else {
          throw new Error('NotifyClient failed with unexpected error %o', err);
        }
      });

    if (!notifyResponse) {
      this.logger.error('Empty response from GOV.UK Notify');
      throw new UnprocessableEntityException('No GOV.UK Notify response');
    }

    const { status, data } = notifyResponse;
    return { status, data };
  }
}
