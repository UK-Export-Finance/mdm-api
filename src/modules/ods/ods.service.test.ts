import { OdsService } from './ods.service';
import { ODS_ENTITIES, odsStoredProcedureInput } from './dto/ods-payloads.dto';
import { CUSTOMERS } from '@ukef/constants';
import { DataSource, QueryRunner } from 'typeorm';

describe('OdsService', () => {
  let service: OdsService;
  let mockQueryRunner: jest.Mocked<QueryRunner>;
  let mockDataSource: jest.Mocked<DataSource>;

  beforeEach(() => {
    mockQueryRunner = {
      query: jest.fn(),
      release: jest.fn(),
    } as unknown as jest.Mocked<QueryRunner>;

    mockDataSource = {
      createQueryRunner: jest.fn().mockReturnValue(mockQueryRunner),
    } as unknown as jest.Mocked<DataSource>;

    service = new OdsService(mockDataSource, null);
  });

  it('callOdsPrcedure should call the stored procedure with the query runner', async () => {
    const mockInput: odsStoredProcedureInput = service.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, {
      customer_party_unique_reference_number: CUSTOMERS.EXAMPLES.PARTYURN,
    });

    const mockResult = [{ output_body: JSON.stringify({ id: '123', name: 'Test Customer' }) }];
    mockQueryRunner.query.mockResolvedValue(mockResult);

    const result = await service.callOdsStoredProcedure(mockInput);

    expect(mockDataSource.createQueryRunner).toHaveBeenCalled();
    expect(mockQueryRunner.query).toHaveBeenCalledWith(
      `
        DECLARE @output_body NVARCHAR(MAX);
        EXEC t_apim.sp_ODS_query @input_body=@0, @output_body=@output_body OUTPUT;
        SELECT @output_body as output_body
      `,
      [JSON.stringify(mockInput)],
    );
    expect(result).toEqual(mockResult);
    expect(mockQueryRunner.release).toHaveBeenCalled();
  });

  it('findCustomer should return a customer the customer urn and name when findCustomer is called', async () => {
    const mockCustomer = { customerUrn: CUSTOMERS.EXAMPLES.PARTYURN, customerName: 'Test Customer' };
    const mockStoredProcedureOutput = [
      {
        output_body: `{"query_request_id":"9E2A4295-2EF9-482E-88AC-7DBF0FE19140","message":"SUCCESS","status":"SUCCESS","total_result_count":1,"results":[{"customer_party_unique_reference_number":"${mockCustomer.customerUrn}","customer_name":"${mockCustomer.customerName}","customer_companies_house_number":"05210925","customer_addresses":[{"customer_address_type":"Registered","customer_address_street":"Unit 3, Campus 5\\r\\nThird Avenue","customer_address_postcode":"SG6 2JF","customer_address_country":"United Kingdom","customer_address_city":"Letchworth Garden City"}]}]}`,
      },
    ];
    const mockInput: odsStoredProcedureInput = service.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, {
      customer_party_unique_reference_number: mockCustomer.customerUrn,
    });

    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockStoredProcedureOutput);

    const result = await service.findCustomer(mockCustomer.customerUrn);

    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockCustomer);
  });

  it('createOdsStoredProcedureInput should map the inputs to the stored procedure input format', async () => {
    const exampleCustomerQueryParameters = {
      customer_party_unique_reference_number: CUSTOMERS.EXAMPLES.PARTYURN,
    };

    const expected: odsStoredProcedureInput = {
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
