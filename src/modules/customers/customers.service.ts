import { Injectable } from '@nestjs/common';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';

import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly informaticaService: InformaticaService) {}

  async getCustomers(backendQuery: GetCustomersInformaticaQueryDto): Promise<GetCustomersResponse> {
    const customersInInformatica = await this.informaticaService.getCustomers(backendQuery);
    return customersInInformatica.map(
      (customerInInformatica): GetCustomersResponseItem => ({
        partyUrn: customerInInformatica.partyUrn,
        name: customerInInformatica.name,
        sfId: customerInInformatica.sfId,
        companyRegNo: customerInInformatica.companyRegNo,
        type: customerInInformatica.type,
        subtype: customerInInformatica.subtype,
        isLegacyRecord: customerInInformatica.isLegacyRecord,
      }),
    );
  }

  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<GetCustomersResponseItem> {
    
    const testResponse: GetCustomersResponseItem = {       
      partyUrn: 'partyurn',
      name: createCustomerDto.Name,
      sfId: 'id',
      companyRegNo: 'regno',
      type: 'type',
      subtype: 'subtype',
      isLegacyRecord: false,
    }
    return testResponse
  }
}
