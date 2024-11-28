import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { GetCustomersInformaticaQueryDto } from '../informatica/dto/get-customers-informatica-query.dto';
import { CustomersService } from './customers.service';
import { GetCustomersQueryDto } from './dto/get-customers-query.dto';
import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { GetCustomersSalesforceResponse, GetCustomersSalesforceResponseItem } from './dto/get-customers-salesforce-response.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get customers from Salesforce via Informatica',
  })
  @ApiResponse({
    status: 200,
    description: 'Customers matching search parameters',
    type: [GetCustomersResponseItem],
  })
  @ApiNotFoundResponse({
    description: 'Customer not found',
  })
  getCustomers(@Query() query: GetCustomersQueryDto): Promise<GetCustomersResponse> {
    this.ensureOneIsNotEmpty(query.companyReg, query.name, query.partyUrn);
    const backendQuery: GetCustomersInformaticaQueryDto = {
      ...(query.companyReg ? { companyreg: query.companyReg } : {}),
      ...(query.name ? { name: query.name } : {}),
      ...(query.partyUrn ? { partyUrn: query.partyUrn } : {}),
      ...{ includeLegacyData: query.fallbackToLegacyData },
    };
    return this.customersService.getCustomers(backendQuery);
  }

  @Post()
  @ApiOperation({
    summary: 'Get a customer in Salesforce, or create one if it does not exist',
  })
  @ApiCreatedResponse({
    description: 'Customer successfully created',
    type: [GetCustomersSalesforceResponseItem],
  })
  @ApiBadRequestResponse({
    description: 'This customer already exists in Salesforce',
  })
  @ApiUnauthorizedResponse({
    description: 'Failed to get access token'
  })
  createCustomer(@Body() DTFSCustomerDto: DTFSCustomerDto): Promise<GetCustomersSalesforceResponse> {
    return this.customersService.getOrCreateCustomer(DTFSCustomerDto);
  }

  private ensureOneIsNotEmpty(...args) {
    if (args.filter((arg) => arg).length !== 1) {
      throw new BadRequestException('One and just one search parameter is required');
    }
  }
}
