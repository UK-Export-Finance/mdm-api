import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CUSTOMERS, DEALS } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';

describe('OdsService', () => {
  let service: OdsService;
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  let mockDataSource: jest.Mocked<DataSource>;
  const mockLogger = new PinoLogger({});

  beforeEach(() => {
    mockQueryRunner = {
      query: jest.fn(),
      release: jest.fn(),
    } as unknown as jest.Mocked<QueryRunner>;

    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
    } as unknown as jest.Mocked<DataSource>;

    service = new OdsService(mockDataSource, mockLogger);
  });

  describe('findCustomer', () => {
    const mockCustomer = { urn: CUSTOMERS.EXAMPLES.PARTYURN, name: 'Test Customer' };

    const mockStoredProcedureOutput = `{
      "query_request_id": "Test ID",
      "message": "SUCCESS",
      "status": "SUCCESS",
      "total_result_count": 1,
      "results": [
        {
          "customer_party_unique_reference_number": "${mockCustomer.urn}",
          "customer_name": "${mockCustomer.name}",
          "customer_companies_house_number": "12345678",
          "customer_addresses": [
            {
              "customer_address_type": "Registered",
              "customer_address_street": "Test Street",
              "customer_address_postcode": "AA1 1BB",
              "customer_address_country": "United Kingdom",
              "customer_address_city": "Test City"
            }
          ]
        }
      ]
    }`;

    beforeEach(() => {
      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);
    });

    it('should call service.callOdsStoredProcedure', async () => {
      await service.findCustomer(mockCustomer.urn);

      const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, {
        customer_party_unique_reference_number: mockCustomer.urn,
      });

      expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
      expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
    });

    it('should return a customer', async () => {
      const result = await service.findCustomer(mockCustomer.urn);

      expect(result).toEqual(mockCustomer);
    });

    describe('when the response from ODS does not have status as SUCCESS', () => {
      it('should throw an error', async () => {
        const mockStoredProcedureOutput = `{ "status": "NOT SUCCESS" }`;

        jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

        const expected = new Error('Error trying to find a customer');

        const promise = service.findCustomer(mockCustomer.urn);

        await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

        await expect(promise).rejects.toThrow(expected);
      });
    });

    describe('when the response from ODS has total_result_count as 0', () => {
      it('should throw an error', async () => {
        const mockStoredProcedureOutput = `{ "status": "SUCCESS", "total_result_count": 0 }`;

        jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

        const expected = new Error('No customer found');

        const promise = service.findCustomer(mockCustomer.urn);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);

        await expect(promise).rejects.toThrow(expected);
      });
    });

    describe('when the method goes into the catch handler', () => {
      it('should throw an error', async () => {
        const mockStoredProcedureOutput = `{ "status": "SUCCESS" }`;

        jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

        const expected = new Error('Error trying to find a customer');

        const promise = service.findCustomer(mockCustomer.urn);

        await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

        await expect(promise).rejects.toThrow(expected);
      });
    });

    describe('when callOdsStoredProcedure throws an error', () => {
      it('should throw an error', async () => {
        jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue('Mock ODS error');

        const expected = new Error('Error trying to find a customer');

        const promise = service.findCustomer(mockCustomer.urn);

        await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

        await expect(promise).rejects.toThrow(expected);
      });
    });
  });

  describe('findDeal', () => {
    const mockStoredProcedureOutput = `{
      "query_request_id": "Test ID",
      "message": "SUCCESS",
      "status": "SUCCESS",
      "total_result_count": 1,
      "results": [
        {
          "deal_code": "${DEALS.EXAMPLES.ID}",
          "deal_name": "${DEALS.EXAMPLES.NAME}",
          "deal_type_description": "${DEALS.EXAMPLES.DESCRIPTION}"
        }
      ]
    }`;

    beforeEach(() => {
      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);
    });

    it('should call service.callOdsStoredProcedure', async () => {
      const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput(ODS_ENTITIES.DEAL, {
        deal_code: DEALS.EXAMPLES.ID,
      });

      await service.findDeal(DEALS.EXAMPLES.ID);

      expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
      expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
    });

    it('should return a deal', async () => {
      const result = await service.findDeal(DEALS.EXAMPLES.ID);

      const expected = {
        dealId: DEALS.EXAMPLES.ID,
        name: DEALS.EXAMPLES.NAME,
        description: DEALS.EXAMPLES.DESCRIPTION,
      };

      expect(result).toEqual(expected);
    });

    describe('when the response from ODS does not have status as SUCCESS', () => {
      it('should throw an error', async () => {
        const mockStoredProcedureOutput = `{ "status": "NOT SUCCESS" }`;

        jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

        const expected = new Error('Error trying to find a deal');

        const promise = service.findDeal(DEALS.EXAMPLES.ID);

        await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

        await expect(promise).rejects.toThrow(expected);
      });
    });

    describe('when the response from ODS has total_result_count as 0', () => {
      it('should throw an error', async () => {
        const mockStoredProcedureOutput = `{ "status": "SUCCESS", "total_result_count": 0 }`;

        jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

        const expected = new Error('No deal found');

        const promise = service.findDeal(DEALS.EXAMPLES.ID);

        await expect(promise).rejects.toBeInstanceOf(NotFoundException);

        await expect(promise).rejects.toThrow(expected);
      });
    });

    describe('when the method goes into the catch handler', () => {
      it('should throw an error', async () => {
        const mockStoredProcedureOutput = `{ "status": "SUCCESS" }`;

        jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

        const expected = new Error('Error trying to find a deal');

        const promise = service.findDeal(DEALS.EXAMPLES.ID);

        await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

        await expect(promise).rejects.toThrow(expected);
      });
    });

    describe('when callOdsStoredProcedure throws an error', () => {
      it('should throw an error', async () => {
        jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue('Mock ODS error');

        const expected = new Error('Error trying to find a deal');

        const promise = service.findDeal(DEALS.EXAMPLES.ID);

        await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

        await expect(promise).rejects.toThrow(expected);
      });
    });
  });

  describe('createOdsStoredProcedureInput', () => {
    it('should map the inputs to the stored procedure input format', () => {
      const exampleCustomerQueryParameters = {
        customer_party_unique_reference_number: CUSTOMERS.EXAMPLES.PARTYURN,
      };

      const expected: OdsStoredProcedureInput = {
        query_method: 'get',
        query_object: ODS_ENTITIES.CUSTOMER,
        query_page_size: 1,
        query_page_index: 1,
        query_parameters: exampleCustomerQueryParameters,
      };
      const result = service.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, exampleCustomerQueryParameters);

      expect(result).toEqual(expected);
    });
  });

  describe('callOdsStoredProcedure', () => {
    it('should call the stored procedure with the query runner', async () => {
      const mockInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, {
        customer_party_unique_reference_number: CUSTOMERS.EXAMPLES.PARTYURN,
      });

      const mockOutputBody = JSON.stringify({ id: '123', name: 'Test Customer' });

      const mockResult = [{ output_body: mockOutputBody }];

      mockQueryRunner.query.mockResolvedValue(mockResult);

      const result = await service.callOdsStoredProcedure(mockInput);

      expect(mockDataSource.createQueryRunner).toHaveBeenCalledTimes(1);

      expect(mockQueryRunner.query).toHaveBeenCalledWith(
        expect.stringMatching(
          /DECLARE @output_body NVARCHAR\(MAX\);\s*EXEC t_apim\.sp_ODS_query @input_body=@0, @output_body=@output_body OUTPUT;\s*SELECT @output_body as output_body\s*/,
        ),
        [JSON.stringify(mockInput)],
      );

      expect(result).toEqual(mockOutputBody);

      expect(mockQueryRunner.release).toHaveBeenCalled();
    });

    it('throws an error if calling the stored procedure fails', async () => {
      const mockInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, {
        customer_party_unique_reference_number: CUSTOMERS.EXAMPLES.PARTYURN,
      });

      mockQueryRunner.query.mockRejectedValue(new Error('Test Error'));

      const resultPromise = service.callOdsStoredProcedure(mockInput);

      await expect(resultPromise).rejects.toThrow('Test Error');

      expect(mockDataSource.createQueryRunner).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.release).toHaveBeenCalledTimes(1);
    });
  });
});
