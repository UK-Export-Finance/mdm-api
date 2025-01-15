import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { OdsService } from './ods.service';
import { GetOdsCustomerParamDto } from './dto/get-ods-customer-param.dto';
import { GetOdsCustomerResponse } from './dto/get-ods-customer-response.dto';

@ApiTags('ods')
@Controller('ods')
export class OdsController {
  constructor(private readonly odsService: OdsService) {}

  @Get('customers/:customerUrn')
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
  findCustomer(@Param() param: GetOdsCustomerParamDto): Promise<GetOdsCustomerResponse> {
    return this.odsService.findCustomer(param.urn);
  }
}
