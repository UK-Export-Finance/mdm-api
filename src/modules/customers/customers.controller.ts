import { BadRequestException, Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';

import { GetCustomersInformaticaQueryDto } from '../informatica/dto/get-customers-informatica-query.dto';
import { CustomersService } from './customers.service';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { DTFSCustomerDto } from './dto/dtfs-customer.dto';
import { GetCustomersQueryDto } from './dto/get-customers-query.dto';
import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get customers from Salesforce via Informatica',
  })
  @ApiResponse({
    status: HttpStatusCode.Ok,
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
    description: 'Failed to get access token',
  })
  getOrCreateCustomer(@Res() res: Response, @Body() DTFSCustomerDto: DTFSCustomerDto): Promise<GetCustomersResponse> {
    return this.customersService.getOrCreateCustomer(res, DTFSCustomerDto);
  }

  @Get('dun-bradstreet')
  @ApiOperation({
    summary: 'Get DUNS number for a Company Registration Number',
  })
  @ApiResponse({
    status: HttpStatusCode.Ok,
    description: 'DUNS number',
    type: String,
  })
  @ApiNotFoundResponse({
    description: 'Customer not found.',
  })
  getDunAndBradstreetNumber(@Query() query: CompanyRegistrationNumberDto): Promise<string> {
    return this.customersService.getDunAndBradstreetNumber(query.companyRegistrationNumber);
  }

  private ensureOneIsNotEmpty(...args) {
    if (args.filter((arg) => arg).length !== 1) {
      throw new BadRequestException('One and just one search parameter is required');
    }
  }
}
