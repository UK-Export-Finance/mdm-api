import { jest } from '@jest/globals';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { resetAllWhenMocks, when } from 'jest-when';
import { of, throwError } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';

import { DunAndBradstreetService } from './dun-and-bradstreet.service';
import { DunAndBradstreetException } from './exception/dun-and-bradstreet.exception';

describe('DunAndBradstreetService', () => {
  let httpServiceGet: jest.SpiedFunction<HttpService['get']>;
  let httpServicePost: jest.SpiedFunction<HttpService['post']>;
  let service: DunAndBradstreetService;
  let logger: PinoLogger;

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
    httpServicePost = jest.spyOn(httpService, 'post').mockReset();

    const configService = new ConfigService();

    jest.spyOn(configService, 'get').mockReset().mockReturnValue({ key: 'TEST API_KEY' });

    logger = new PinoLogger({});
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

    it.each([
      { scenario: 'the response has no match candidates property', data: {} },
      { scenario: 'the response has an empty list of match candidates', data: { matchCandidates: [] } },
      { scenario: 'the match candidate has no organization', data: { matchCandidates: [{}] } },
      { scenario: 'the organization has no DUNS number', data: { matchCandidates: [{ organization: {} }] } },
    ])('should throw a DunAndBradstreetException if $scenario', async ({ data }) => {
      // Arrange
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArguments)
        .mockReturnValueOnce(of({ data, status: HttpStatusCode.Ok, statusText: 'OK', config: undefined, headers: undefined } as AxiosResponse));

      // Act
      const getDunsNumberPromise = service.getDunAndBradstreetNumberByRegistrationNumber(testRegistrationNumber);

      // Assert
      await expect(getDunsNumberPromise).rejects.toBeInstanceOf(DunAndBradstreetException);
      await expect(getDunsNumberPromise).rejects.toThrow(
        `Dun and Bradstreet response for company ${testRegistrationNumber} did not include a usable DUNS number.`,
      );
    });
  });

  describe('getAccessToken (invoked via getDunAndBradstreetNumberByRegistrationNumber)', () => {
    beforeAll(() => {
      getAccessTokenMethodMock.mockRestore();
    });

    it('requests a token and calls the match endpoint with it when the token request succeeds', async () => {
      // Arrange
      httpServicePost.mockReturnValueOnce(of({ data: { access_token: expectedAccessToken } } as AxiosResponse));
      httpServiceGet.mockReturnValueOnce(expectedHttpServiceGetResponse);

      // Act
      const response = await service.getDunAndBradstreetNumberByRegistrationNumber(testRegistrationNumber);

      // Assert
      expect(response).toBe(expectedDunsNumber);
      expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArguments);
    });

    it('throws a DunAndBradstreetException and does not call the match endpoint if the token response does not include an access token', async () => {
      // Arrange
      httpServicePost.mockReturnValueOnce(of({ data: {} } as AxiosResponse));

      // Act
      const getDunsNumberPromise = service.getDunAndBradstreetNumberByRegistrationNumber(testRegistrationNumber);

      // Assert
      await expect(getDunsNumberPromise).rejects.toBeInstanceOf(DunAndBradstreetException);
      await expect(getDunsNumberPromise).rejects.toThrow('Dun and Bradstreet authentication response did not include an access token.');
      expect(httpServiceGet).not.toHaveBeenCalled();
    });

    it('logs and rethrows without exposing credentials if the token request itself fails', async () => {
      // Arrange
      const axiosError = new AxiosError('Authentication failed');
      httpServicePost.mockReturnValueOnce(throwError(() => axiosError));

      // Act
      const getDunsNumberPromise = service.getDunAndBradstreetNumberByRegistrationNumber(testRegistrationNumber);

      // Assert
      await expect(getDunsNumberPromise).rejects.toBeInstanceOf(DunAndBradstreetException);
      await expect(getDunsNumberPromise).rejects.toThrow('Failed to get access token');

      expect(httpServiceGet).not.toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        'Failed to retrieve Dun and Bradstreet access token %o',
        expect.objectContaining({ name: 'DunAndBradstreetException', message: 'Failed to get access token' }),
      );
      expect(logger.error).not.toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ config: expect.anything() }));
    });
  });
});
