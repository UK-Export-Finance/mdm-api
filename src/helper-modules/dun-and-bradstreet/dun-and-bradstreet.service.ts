import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { DunAndBradstreetConfigType } from '@ukef/config/dun-and-bradstreet.config';
import { DUN_AND_BRADSTREET } from '@ukef/constants';
import { sanitizeErrorForLogging } from '@ukef/helpers/sanitize-error-for-logging.helper';
import { HttpClient } from '@ukef/modules/http/http.client';

import { DunAndBradstreetException } from './exception/dun-and-bradstreet.exception';
import { getDunAndBradstreetNumberByRegistrationNumberNotFoundError } from './known-errors';
import { createWrapDunAndBradstreetHttpGetErrorCallback } from './wrap-dun-and-bradstreet-http-error-callback';

@Injectable()
export class DunAndBradstreetService {
  private readonly httpClient: HttpClient;

  private readonly encodedKey: string;

  constructor(
    httpService: HttpService,
    configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.httpClient = new HttpClient(httpService);
    const { key } = configService.get<DunAndBradstreetConfigType>(DUN_AND_BRADSTREET.CONFIG.KEY);
    this.encodedKey = key;
  }

  async getDunAndBradstreetNumberByRegistrationNumber(registrationNumber: string): Promise<string> {
    const path = `/v1/match/cleanseMatch?countryISOAlpha2Code=GB&registrationNumber=${registrationNumber}`;
    const accessToken = await this.getAccessToken();

    try {
      this.logger.info('Getting Dun and Bradstreet number for company %s', registrationNumber);

      const { data } = await this.httpClient.get<any>({
        path,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        onError: createWrapDunAndBradstreetHttpGetErrorCallback({
          messageForUnknownError: 'Failed to get response from Dun and Bradstreet API',
          knownErrors: [getDunAndBradstreetNumberByRegistrationNumberNotFoundError()],
        }),
      });

      const dunsNumber = data?.matchCandidates?.[0]?.organization?.duns;

      if (!dunsNumber) {
        throw new DunAndBradstreetException(`Dun and Bradstreet response for company ${registrationNumber} did not include a usable DUNS number.`);
      }

      return dunsNumber;
    } catch (error) {
      if (error instanceof NotFoundException) {
        this.logger.warn('Dun and Bradstreet number for company %s not found %o', registrationNumber, sanitizeErrorForLogging(error));
      } else {
        this.logger.error('Error getting Dun and Bradstreet number for company %s %o', registrationNumber, sanitizeErrorForLogging(error));
      }

      throw error;
    }
  }

  private async getAccessToken(): Promise<string> {
    const path = '/v3/token';

    try {
      this.logger.info('Requesting Dun and Bradstreet access token');

      const response = await this.httpClient.post<any, any>({
        path,
        body: {
          grant_type: 'client_credentials',
        },
        headers: {
          Authorization: `Basic ${this.encodedKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        onError: createWrapDunAndBradstreetHttpGetErrorCallback({
          messageForUnknownError: 'Failed to get access token',
          knownErrors: [],
        }),
      });

      const accessToken = response.data?.access_token;

      if (!accessToken) {
        throw new DunAndBradstreetException('Dun and Bradstreet authentication response did not include an access token.');
      }

      return accessToken;
    } catch (error) {
      this.logger.error('Failed to retrieve Dun and Bradstreet access token %o', sanitizeErrorForLogging(error));

      throw error;
    }
  }
}
