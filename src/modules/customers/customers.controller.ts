import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetCustomersInformaticaQueryDto } from '../informatica/dto/get-customers-informatica-query.dto';
import { CustomersService } from './customers.service';
import { GetCustomersQueryDto } from './dto/get-customers-query.dto';
import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get customers from Salesforce',
  })
  @ApiResponse({
    status: 200,
    description: 'Customers matching search parameters',
    type: [GetCustomersResponseItem],
  })
  @ApiNotFoundResponse({
    description: 'Customer not found.',
  })
  getCustomers(@Query() query: GetCustomersQueryDto): Promise<GetCustomersResponse> {
    this.ensureOneIsNotEmpty(query.companyReg, query.name, query.partyUrn);
    const backendQuery: GetCustomersInformaticaQueryDto = {
      ...(query.companyReg ? { companyReg: query.companyReg } : {}),
      ...(query.name ? { name: query.name } : {}),
      ...(query.partyUrn ? { partyUrn: query.partyUrn } : {}),
      ...{ includeLegacyData: query.fallbackToLegacyData },
    };
    return this.customersService.getCustomers(backendQuery);
  }

  private ensureOneIsNotEmpty(...args) {
    if (args.filter((arg) => arg).length !== 1) {
      throw new BadRequestException('One and just one search parameter is required');
    }
  }
}
