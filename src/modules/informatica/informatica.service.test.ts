import { HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { ENUMS } from '@ukef/constants';
import { RandomValueGenerator } from '@ukef-test/support/generator/random-value-generator';
import { AxiosError } from 'axios';
import { when } from 'jest-when';
import { of, throwError } from 'rxjs';

import { GetCustomersInformaticaQueryDto } from './dto/get-customers-informatica-query.dto';
import { InformaticaException } from './exception/informatica.exception';
import { InformaticaService } from './informatica.service';

describe('InformaticaService', () => {
  const valueGenerator = new RandomValueGenerator();

  let httpServiceGet: jest.Mock;
  let service: InformaticaService;

  beforeEach(() => {
    const httpService = new HttpService();
    httpServiceGet = jest.fn();
    httpService.get = httpServiceGet;

    service = new InformaticaService(httpService);
  });

  const partyUrn = '003' + valueGenerator.stringOfNumericCharacters({ length: 5 });
  const companyRegNo = '0' + valueGenerator.stringOfNumericCharacters({ length: 7 });
  const name = valueGenerator.word();
  const customerBasePath = '/account';
  const expectedResponse = [
    {
      partyUrn: partyUrn,
      name: name,
      sfId: valueGenerator.word(),
      companyRegNo: companyRegNo,
      type: null,
      subtype: null,
      isLegacyRecord: valueGenerator.boolean(),
    },
  ];

  describe('getCustomers', () => {
    const query: GetCustomersInformaticaQueryDto = {
      companyreg: companyRegNo,
      includeLegacyData: ENUMS.FALLBACK_TO_LEGACY_DATA.YES,
    };

    const expectedPath = `${customerBasePath}?companyreg=${companyRegNo}&includeLegacyData=yes`;

    const expectedHttpServiceGetArgs: [string, object] = [expectedPath, { headers: { 'Content-Type': 'application/json' } }];

    it('sends a GET to the Informatica /account endpoint with the specified request', async () => {
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(
          of({
            data: expectedResponse,
            status: 200,
            statusText: 'OK',
            config: undefined,
            headers: undefined,
          }),
        );

      await service.getCustomers(query);

      expect(httpServiceGet).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArgs);
    });

    it.each([
      {
        query: { name: 'test' },
        expectedUrlQueryPart: `?name=test`,
      },
      {
        query: { name: 'param one', includeLegacyData: 'param two' },
        expectedUrlQueryPart: '?name=param+one&includeLegacyData=param+two',
      },
      {
        query: { name: 'Company %26@/;%<>=', includeLegacyData: 'yes' },
        expectedUrlQueryPart: '?name=Company+%2526%40%2F%3B%25%3C%3E%3D&includeLegacyData=yes',
      },
    ])('call informatica with correct and safe query parameters "$expectedUrlQueryPart"', async ({ query, expectedUrlQueryPart }) => {
      const expectedPath = `${customerBasePath}${expectedUrlQueryPart}`;

      const expectedHttpServiceGetArgs: [string, object] = [expectedPath, { headers: { 'Content-Type': 'application/json' } }];

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(
          of({
            data: expectedResponse,
            status: 200,
            statusText: 'OK',
            config: undefined,
            headers: undefined,
          }),
        );

      await service.getCustomers(query);

      expect(httpServiceGet).toHaveBeenCalledTimes(1);
      expect(httpServiceGet).toHaveBeenCalledWith(...expectedHttpServiceGetArgs);
    });

    it('returns 404 Not Found if informatica responds with 404', async () => {
      const notFoundError = new AxiosError(null, null, null, null, {
        status: 404,
        statusText: 'Not Found',
        headers: null,
        config: null,
        data: [
          {
            error: {
              errorCode: '404',
              errorDateTime: '2023-06-30T13:41:33Z',
              errorMessage: 'Company registration not found',
              errorDescription: 'Party details request for the requested company registration not found.',
            },
          },
        ],
      });

      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(throwError(() => notFoundError));

      const getCustomersPromise = service.getCustomers(query);

      await expect(getCustomersPromise).rejects.toBeInstanceOf(NotFoundException);
      await expect(getCustomersPromise).rejects.toThrow('Customer not found.');
    });

    it('throws an InformaticaException if the request to Informatica fails', async () => {
      const axiosRequestError = new AxiosError();
      when(httpServiceGet)
        .calledWith(...expectedHttpServiceGetArgs)
        .mockReturnValueOnce(throwError(() => axiosRequestError));
      const getCustomersPromise = service.getCustomers(query);

      await expect(getCustomersPromise).rejects.toBeInstanceOf(InformaticaException);
      await expect(getCustomersPromise).rejects.toThrow('Failed to get customers in Informatica.');
      await expect(getCustomersPromise).rejects.toHaveProperty('innerError', axiosRequestError);
    });
  });
});
