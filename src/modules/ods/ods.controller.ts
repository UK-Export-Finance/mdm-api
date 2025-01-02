import { Controller, Get, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { OdsService } from './ods.service';
import { GetCustomerQueryDto } from './dto/get-ods-customer-query.dto';
import { GetOdsCustomerResponse } from './dto/get-ods-customer-response.dto';

@ApiTags('ods')
@Controller('ods')
export class OdsController {
  constructor(private readonly odsService: OdsService) {}

  @Get('customers')
  @ApiOperation({
    summary: 'Get customers from ODS',
  })
  @ApiResponse({
    status: 200,
    description: 'Customers matching search parameters',
    type: GetOdsCustomerResponse,
  })
  @ApiNotFoundResponse({
    description: 'Customer not found.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid search parameters provided.',
  })
  getCustomers(@Query() query: GetCustomerQueryDto): Promise<GetOdsCustomerResponse> {
    return this.odsService.getCustomer(query.partyUrn);
  }
}
