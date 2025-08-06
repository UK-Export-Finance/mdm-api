import { EXAMPLES } from '@ukef/constants';
import { PinoLogger } from 'nestjs-pino';
import { DataSource, QueryRunner } from 'typeorm';

import { ODS_ENTITIES, OdsStoredProcedureInput } from './dto/ods-payloads.dto';
import { OdsService } from './ods.service';

const mockError = new Error('An error occurred');

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

  describe('createOdsStoredProcedureInput', () => {
    it('should map the inputs to the stored procedure input format', () => {
      // Arrange
      const exampleCustomerQueryParameters = {
        customer_party_unique_reference_number: EXAMPLES.CUSTOMER.PARTYURN,
      };

      // Act
      const result = service.createOdsStoredProcedureInput({
        entityToQuery: ODS_ENTITIES.CUSTOMER,
        queryPageSize: 100,
        queryParameters: exampleCustomerQueryParameters,
      });

      // Assert
      const expected: OdsStoredProcedureInput = {
        query_method: 'get',
        query_object: ODS_ENTITIES.CUSTOMER,
        query_page_size: 100,
        query_page_index: 1,
        query_parameters: exampleCustomerQueryParameters,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('callOdsStoredProcedure', () => {
    it('should call the stored procedure with the query runner', async () => {
      // Arrange
      const mockInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
        entityToQuery: ODS_ENTITIES.CUSTOMER,
        queryPageSize: 100,
        queryParameters: { customer_party_unique_reference_number: EXAMPLES.CUSTOMER.PARTYURN },
      });

      const mockOutputBody = JSON.stringify({ id: '123', name: 'Test Customer' });

      const mockResult = [{ output_body: mockOutputBody }];

      mockQueryRunner.query.mockResolvedValue(mockResult);

      // Act
      const result = await service.callOdsStoredProcedure(mockInput);

      // Assert
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
      // Arrange
      const mockInput: OdsStoredProcedureInput = service.createOdsStoredProcedureInput({
        entityToQuery: ODS_ENTITIES.CUSTOMER,
        queryParameters: { customer_party_unique_reference_number: EXAMPLES.CUSTOMER.PARTYURN },
      });

      mockQueryRunner.query.mockRejectedValue(mockError);

      // Act & Assert
      const promise = service.callOdsStoredProcedure(mockInput);

      await expect(promise).rejects.toThrow(mockError);

      expect(mockDataSource.createQueryRunner).toHaveBeenCalledTimes(1);
      expect(mockQueryRunner.release).toHaveBeenCalledTimes(1);
    });
  });
});
