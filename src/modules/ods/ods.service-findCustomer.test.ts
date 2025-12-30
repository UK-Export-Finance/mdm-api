import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { EXAMPLES, STORED_PROCEDURE } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';

describe('OdsService - findCustomer', () => {
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

  const mockCustomer = { urn: EXAMPLES.CUSTOMER.PARTYURN, name: 'Mock Customer' };

  const mockStoredProcedureOutput = `{
    "query_request_id": "Test ID",
    "message": "${STORED_PROCEDURE.SUCCESS}",
    "status": "${STORED_PROCEDURE.SUCCESS}",
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
    // Act
    await service.findCustomer(mockCustomer.urn);

    // Assert
    const expectedStoredProcedureInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
      entityToQuery: ODS_ENTITIES.CUSTOMER,
      queryPageSize: 1,
      queryParameters: { customer_party_unique_reference_number: mockCustomer.urn },
    });

    expect(service.callOdsStoredProcedure).toHaveBeenCalledTimes(1);
    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(expectedStoredProcedureInput);
  });

  it('should return a customer', async () => {
    // Act
    const result = await service.findCustomer(mockCustomer.urn);

    // Assert
    expect(result).toEqual(mockCustomer);
  });

  describe(`when the response from ODS does not have status as ${STORED_PROCEDURE.SUCCESS}`, () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findCustomer(mockCustomer.urn);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding customer ${mockCustomer.urn}`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the response from ODS has total_result_count as 0', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "${STORED_PROCEDURE.SUCCESS}", "total_result_count": 0 }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findCustomer(mockCustomer.urn);

      await expect(promise).rejects.toBeInstanceOf(NotFoundException);

      const expected = new Error(`No customer found ${mockCustomer.urn}`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when the method goes into the catch handler', () => {
    it('should throw an error', async () => {
      // Arrange
      const mockStoredProcedureOutput = `{ "status": "NOT ${STORED_PROCEDURE.SUCCESS}" }`;

      jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

      // Act & Assert
      const promise = service.findCustomer(mockCustomer.urn);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding customer ${mockCustomer.urn}`);

      await expect(promise).rejects.toThrow(expected);
    });
  });

  describe('when callOdsStoredProcedure throws an error', () => {
    it('should throw an error', async () => {
      // Arrange
      jest.spyOn(service, 'callOdsStoredProcedure').mockRejectedValue('Mock ODS error');

      // Act & Assert
      const promise = service.findCustomer(mockCustomer.urn);

      await expect(promise).rejects.toBeInstanceOf(InternalServerErrorException);

      const expected = new Error(`Error finding customer ${mockCustomer.urn}`);

      await expect(promise).rejects.toThrow(expected);
    });
  });
});
