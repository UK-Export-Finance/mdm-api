import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import AppConfig from '@ukef/config/app.config';

import { DomService } from './dom.service';
import {
  FindMultipleDomBusinessCentresNonWorkingDaysResponse,
  GetDomBusinessCentreNonWorkingDayMappedResponse,
  GetDomBusinessCentreNonWorkingDaysParamDto,
  GetDomBusinessCentreParamDto,
  GetDomBusinessCentreResponse,
  GetDomBusinessCentresNonWorkingDaysParamDto,
  GetDomProductConfigurationResponse,
} from './dto';

const { domOdsVersioning } = AppConfig();

@ApiTags('dom')
@Controller({
  path: 'dom',
  version: domOdsVersioning.version,
})
export class DomController {
  constructor(private readonly domService: DomService) {}

  @Get('business-centre/:centreCode')
  @ApiOperation({
    summary: 'Get a business centre from DOM',
  })
  @ApiOkResponse({
    description: 'A DOM business centre',
    type: GetDomBusinessCentreResponse,
  })
  @ApiNotFoundResponse({
    description: 'Business centre not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findBusinessCentre(@Param() param: GetDomBusinessCentreParamDto): GetDomBusinessCentreResponse {
    return this.domService.findBusinessCentre(param.centreCode);
  }

  @Get('business-centre/:centreCode/non-working-days')
  @ApiOperation({
    summary: "Get a business centre's non working days from DOM",
  })
  @ApiOkResponse({
    description: "A DOM business centre's non working days",
    isArray: true,
    type: GetDomBusinessCentreNonWorkingDayMappedResponse,
  })
  @ApiNotFoundResponse({
    description: 'Business centre not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findBusinessCentreNonWorkingDays(@Param() param: GetDomBusinessCentreNonWorkingDaysParamDto): Promise<GetDomBusinessCentreNonWorkingDayMappedResponse[]> {
    return this.domService.findBusinessCentreNonWorkingDays(param.centreCode);
  }

  @Get('business-centres')
  @ApiOperation({
    summary: 'Get business centres from DOM',
  })
  @ApiOkResponse({
    description: 'DOM business centres',
    isArray: true,
    type: GetDomBusinessCentreResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getBusinessCentres(): GetDomBusinessCentreResponse[] {
    return this.domService.getBusinessCentres();
  }

  @Get('business-centres/non-working-days')
  @ApiOperation({
    summary: "Get multiple business centre's non working days from DOM",
  })
  @ApiOkResponse({
    description: "Multiple DOM business centre's non working days",
    type: FindMultipleDomBusinessCentresNonWorkingDaysResponse,
  })
  @ApiNotFoundResponse({
    description: 'Business centres non working days not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findMultipleBusinessCentresNonWorkingDays(
    @Query() query: GetDomBusinessCentresNonWorkingDaysParamDto,
  ): Promise<FindMultipleDomBusinessCentresNonWorkingDaysResponse> {
    return this.domService.findMultipleBusinessCentresNonWorkingDays(query.centreCodes);
  }

  @Get('product-configurations')
  @ApiOperation({
    summary: 'Get all product configurations',
  })
  @ApiOkResponse({
    description: 'Product configurations',
    isArray: true,
    type: GetDomProductConfigurationResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getProductConfigurations(): GetDomProductConfigurationResponse[] {
    return this.domService.getProductConfigurations();
  }
}
