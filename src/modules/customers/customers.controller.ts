import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetCustomersInformaticaQueryDto } from '../informatica/dto/get-customers-informatica-query.dto';
import { CustomersService } from './customers.service';
import { GetCustomersQueryDto } from './dto/get-customers-query.dto';
import { GetCustomersResponse, GetCustomersResponseItem } from './dto/get-customers-response.dto';
import { CreateCustomerSalesforceResponseDto } from '../salesforce/dto/create-customer-salesforce-response.dto';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { GetCustomersDirectResponse, GetCustomersDirectResponseItem } from './dto/get-customers-direct-response.dto';
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
    description: 'Customer not found.',
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

  @Get('direct')
  @ApiOperation({
    summary: 'Get customers directly from Salesforce',
  })
  @ApiResponse({
    status: 200,
    description: 'Customers matching search parameters',
    type: [GetCustomersDirectResponseItem],
  })
  @ApiNotFoundResponse({
    description: 'Customer not found.',
  })
  getCustomersDirect(@Query() companyRegistrationNumber: CompanyRegistrationNumberDto): Promise<GetCustomersDirectResponse> {
    return this.customersService.getCustomersDirect(companyRegistrationNumber);
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new customer',
  })
  @ApiCreatedResponse({
    description: 'Customer successfully created',
    type: CreateCustomerSalesforceResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data',
  })
  createCustomer(@Body() DTFSCustomerDto: DTFSCustomerDto): Promise<CreateCustomerSalesforceResponseDto> {
    return this.customersService.createCustomer(DTFSCustomerDto);
  }

  private ensureOneIsNotEmpty(...args) {
    if (args.filter((arg) => arg).length !== 1) {
      throw new BadRequestException('One and just one search parameter is required');
    }
  }
}
