import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetOdsBusinessCentreMappedResponse, GetOdsCustomerParamDto, GetOdsCustomerResponse, GetOdsDealParamDto, GetOdsDealResponse } from './dto';
import { OdsService } from './ods.service';

@ApiTags('ods')
@Controller('ods')
export class OdsController {
  constructor(private readonly odsService: OdsService) {}

  @Get('business-centres')
  @ApiOperation({
    summary: 'Get business centres from ODS',
  })
  @ApiOkResponse({
    description: 'Business centres',
    isArray: true,
    type: GetOdsBusinessCentreMappedResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  getBusinessCentres(): Promise<GetOdsBusinessCentreMappedResponse[]> {
    return this.odsService.getBusinessCentres();
  }

  @Get('customers/:urn')
  @ApiOperation({
    summary: 'Get a customer from ODS',
  })
  @ApiOkResponse({
    description: 'A customer matching the provided URN',
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

  @Get('deal/:id')
  @ApiOperation({
    summary: 'Get a deal from ODS',
  })
  @ApiOkResponse({
    description: 'A deal matching the provided deal ID',
    type: GetOdsDealResponse,
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
