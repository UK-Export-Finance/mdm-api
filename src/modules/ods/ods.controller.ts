import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import AppConfig from '@ukef/config/app.config';

import {
  GetOdsBusinessCentreMappedResponse,
  GetOdsBusinessCentreNonWorkingDaysParamDto,
  GetOdsCustomerParamDto,
  GetOdsCustomerResponse,
  GetOdsDealParamDto,
  GetOdsDealResponse,
} from './dto';
import { OdsService } from './ods.service';

const { odsVersioning } = AppConfig();

@ApiTags('ods')
@Controller({
  path: 'ods',
  version: odsVersioning.version,
})
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
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  getBusinessCentres(): Promise<GetOdsBusinessCentreMappedResponse[]> {
    return this.odsService.getBusinessCentres();
  }

  @Get('business-centre/:code/non-working-days')
  @ApiOperation({
    summary: "Get a business centre's non working days from ODS",
  })
  @ApiOkResponse({
    description: "Business centre's non working days",
    isArray: true,
    type: GetOdsBusinessCentreMappedResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  findBusinessCentreNonWorkingDays(@Param() param: GetOdsBusinessCentreNonWorkingDaysParamDto): Promise<GetOdsBusinessCentreMappedResponse[]> {
    return this.odsService.findBusinessCentreNonWorkingDays(param.code);
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
