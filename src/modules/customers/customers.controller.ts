import { BadRequestException, Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { GetCustomersInformaticaQueryDto } from '../informatica/dto/get-customers-informatica-query.dto';
import { CustomersService } from './customers.service';
import { GetCustomersQueryDto } from './dto/get-customers-query.dto';
import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { Response } from 'express';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) { }

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
  @ApiResponse({
    status: 200,
    description: 'Customers matching search parameters',
    type: [GetCustomersResponseItem],
  })
  @ApiCreatedResponse({
    description: 'Customer successfully created',
    type: [GetCustomersResponseItem],
  })
  @ApiBadRequestResponse({
    description: 'Failed to create customer as a duplicate record without a company registration number exists',
  })
  @ApiUnauthorizedResponse({
    description: 'Failed to get access token'
  })
  getOrCreateCustomer(@Body() DTFSCustomerDto: DTFSCustomerDto, @Res() res: Response): Promise<GetCustomersResponse> {
    return this.customersService.getOrCreateCustomer(res, DTFSCustomerDto)
  }

  private ensureOneIsNotEmpty(...args) {
    if (args.filter((arg) => arg).length !== 1) {
      throw new BadRequestException('One and just one search parameter is required');
    }
  }
}
