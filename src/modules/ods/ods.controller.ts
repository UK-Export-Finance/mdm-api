import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetOdsCustomerParamDto, GetOdsCustomerResponse, GetOdsDealParamDto, GetOdsDealResponse } from './dto';
import { OdsService } from './ods.service';

@ApiTags('ods')
@Controller('ods')
export class OdsController {
  constructor(private readonly odsService: OdsService) {}

  @Get('customers/:urn')
  @ApiOperation({
    summary: 'Get customers from ODS',
  })
  @ApiOkResponse({
    description: 'Customers matching the provided URN',
    type: GetOdsCustomerResponse,
  })
  @ApiNotFoundResponse({
    description: 'Customer not found.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid search parameters provided.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  findCustomer(@Param() param: GetOdsCustomerParamDto): Promise<GetOdsCustomerResponse> {
    return this.odsService.findCustomer(param.urn);
  }

  @Get('deals/:id')
  @ApiOperation({
    summary: 'Get deals from ODS',
  })
  @ApiOkResponse({
    description: 'Deals matching the provided deal ID',
    type: GetOdsCustomerResponse,
  })
  @ApiNotFoundResponse({
    description: 'Deal not found.',
  })
  @ApiBadRequestResponse({
    description: 'Invalid search parameters provided.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  findDeal(@Param() param: GetOdsDealParamDto): Promise<GetOdsDealResponse> {
    return this.odsService.findDeal(param.id);
  }
}
