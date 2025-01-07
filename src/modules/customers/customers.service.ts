import { Injectable } from '@nestjs/common';
import { DunAndBradstreetService } from '@ukef/helper-modules/dun-and-bradstreet/dun-and-bradstreet.service';
import { GetCustomersInformaticaQueryDto } from '@ukef/modules/informatica/dto/get-customers-informatica-query.dto';
import { InformaticaService } from '@ukef/modules/informatica/informatica.service';

import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly informaticaService: InformaticaService,
    private readonly dunAndBradstreetService: DunAndBradstreetService,
  ) {}

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

  async getDunAndBradstreetNumber(registrationNumber: string): Promise<string> {
    const dunAndBradstreetNumber = await this.dunAndBradstreetService.getDunAndBradstreetNumberByRegistrationNumber(registrationNumber);
    return dunAndBradstreetNumber;
  }
}
