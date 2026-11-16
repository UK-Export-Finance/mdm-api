import { jest } from '@jest/globals';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError, HttpStatusCode } from 'axios';
import { resetAllWhenMocks, when } from 'jest-when';
import { of, throwError } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { DunAndBradstreetService } from './dun-and-bradstreet.service';
import { DunAndBradstreetException } from './exception/dun-and-bradstreet.exception';

describe('DunAndBradstreetService', () => {
  let httpServiceGet: jest.SpiedFunction<HttpService['get']>;
  let service: DunAndBradstreetService;

  const valueGenerator = new RandomValueGenerator();

  const testRegistrationNumber = `0${valueGenerator.stringOfNumericCharacters({ length: 7 })}`;
  const expectedAccessToken = 'TEST_ACCESS_TOKEN';
  const getAccessTokenMethodMock = jest
    .spyOn(DunAndBradstreetService.prototype as any, 'getAccessToken')
    .mockImplementation(() => Promise.resolve(expectedAccessToken));

  const dunAndBradstreetpath = `/v1/match/cleanseMatch?countryISOAlpha2Code=GB&registrationNumber=${testRegistrationNumber}`;
  const expectedDunsNumber = '123456789';
  const getDunsNumberDunAndBradstreetResponse = {
    matchCandidates: [
      {
        organization: {
          duns: expectedDunsNumber,
        },
      },
    ],
  };

  const expectedHttpServiceGetArguments: [string, object] = [
    dunAndBradstreetpath,
    {
      headers: {
        Authorization: `Bearer ${expectedAccessToken}`,
      },
    },
  ];

  const expectedHttpServiceGetResponse = of({
    data: getDunsNumberDunAndBradstreetResponse,
    status: HttpStatusCode.Ok,
    statusText: 'OK',
    config: undefined,
    headers: undefined,
  });

  beforeAll(() => {
    const httpService = new HttpService();

    httpServiceGet = jest.spyOn(httpService, 'get').mockReset();

    const configService = new ConfigService();

    jest.spyOn(configService, 'get').mockReset().mockReturnValue({ key: 'TEST API_KEY' });

    const logger = new PinoLogger({});
    logger.info = jest.fn();
    logger.warn = jest.fn();
    logger.error = jest.fn();

    service = new DunAndBradstreetService(httpService, configService, logger);
  });

  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDunAndBradstreetNumberByRegistrationNumber', () => {
    it('should call the Dun and Bradstreet API with the correct arguments', async () => {
      // Arrange
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(expectedHttpServiceGetResponse);

      // Act
      await service.getDunAndBradstreetNumberByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(getAccessTokenMethodMock).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArguments);
    });

    it('should return the results when the Dun and Bradstreet API returns a 200 response with results', async () => {
      // Arrange
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(expectedHttpServiceGetResponse);

      // Act
      const response = await service.getDunAndBradstreetNumberByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(getAccessTokenMethodMock).toHaveBeenCalledTimes(1);
      expect(response).toBe(expectedDunsNumber);
    });

    it('should throw a DunAndBradstreetException if the Dun and Bradstreet API returns an unknown error response', async () => {
      // Arrange
      const axiosError = new AxiosError();

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(throwError(() => axiosError));

      // Act
      const getDunsNumberPromise = service.getDunAndBradstreetNumberByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(getAccessTokenMethodMock).toHaveBeenCalledTimes(1);
      await expect(getDunsNumberPromise).rejects.toBeInstanceOf(DunAndBradstreetException);
      await expect(getDunsNumberPromise).rejects.toThrow('Failed to get response from Dun and Bradstreet API');
      await expect(getDunsNumberPromise).rejects.toHaveProperty('innerError', axiosError);
    });
  });
});
