import { Controller, Get, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { CustomersService } from './customers.service';
import { CompanyRegistrationNumberDto } from './dto/company-registration-number.dto';
import { GetCustomersSalesforceResponse, GetCustomersSalesforceResponseItem } from './dto/get-customers-salesforce-response.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get customers directly from Salesforce',
  })
  @ApiResponse({
    status: 200,
    description: 'Customers matching search parameters',
    type: [GetCustomersSalesforceResponseItem],
  })
  @ApiNotFoundResponse({
    description: 'Customer not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid Company Registration Number',
  })
  @ApiUnauthorizedResponse({
    description: 'Failed to get access token'
  })
  getCustomersSalesforce(@Query() companyRegistrationNumber: CompanyRegistrationNumberDto): Promise<GetCustomersSalesforceResponse> {
    return this.customersService.getCustomersSalesforce(companyRegistrationNumber);
  }
}
