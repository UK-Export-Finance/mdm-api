import { OdsService } from './ods.service';
import { ODS_ENTITIES, odsStoredProcedureInput } from './dto/ods-payloads.dto';

describe('OdsService', () => {
  let service: OdsService;

  beforeEach(() => {
    service = new OdsService(null, null);
  });

  it('should call callOdsStoredProcedure with correct parameters and return mock customer', async () => {
    const mockCustomer = { id: '12312312', name: 'Test Customer' };
    const mockInput: odsStoredProcedureInput = service.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, { customer_party_unique_reference_number: '12312312' })

    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockCustomer);

    const result = await service.findCustomer('12312312');

    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockCustomer);
  });


  it('should call callOdsStoredProcedure with correct parameters and return mock customer', async () => {
    const mockCustomer = { id: '12312312', name: 'Test Customer' };
    const mockInput: odsStoredProcedureInput = service.createOdsStoredProcedureInput(ODS_ENTITIES.CUSTOMER, { customer_party_unique_reference_number: '12312312' })

    jest.spyOn(service, 'callOdsStoredProcedure').mockResolvedValue(mockCustomer);

    const result = await service.callOdsStoredProcedure(mockInput);

    expect(service.callOdsStoredProcedure).toHaveBeenCalledWith(mockInput);
    expect(result).toEqual(mockCustomer);
  });
});
