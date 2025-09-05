import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import AppConfig from '@ukef/config/app.config';

import { DomService } from './dom.service';
import {
  FindDomBusinessCentreNonWorkingDayMappedResponse,
  FindDomBusinessCentreResponse,
  FindMultipleDomBusinessCentresNonWorkingDaysResponse,
  GetDomBusinessCentreNonWorkingDaysParamDto,
  GetDomBusinessCentreParamDto,
  GetDomBusinessCentresNonWorkingDaysParamDto,
  GetDomProductConfigResponse,
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
    type: FindDomBusinessCentreResponse,
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
  findBusinessCentre(@Param() param: GetDomBusinessCentreParamDto): FindDomBusinessCentreResponse {
    return this.domService.findBusinessCentre(param.centreCode);
  }

  @Get('business-centre/:centreCode/non-working-days')
  @ApiOperation({
    summary: "Get a business centre's non working days from DOM",
  })
  @ApiOkResponse({
    description: "A DOM business centre's non working days",
    isArray: true,
    type: FindDomBusinessCentreNonWorkingDayMappedResponse,
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
  findBusinessCentreNonWorkingDays(@Param() param: GetDomBusinessCentreNonWorkingDaysParamDto): Promise<FindDomBusinessCentreNonWorkingDayMappedResponse[]> {
    return this.domService.findBusinessCentreNonWorkingDays(param.centreCode);
  }

  @Get('business-centres')
  @ApiOperation({
    summary: 'Get business centres from DOM',
  })
  @ApiOkResponse({
    description: 'DOM business centres',
    isArray: true,
    type: FindDomBusinessCentreResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getBusinessCentres(): FindDomBusinessCentreResponse[] {
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
    summary: 'Get all product configurations from DOM',
  })
  @ApiOkResponse({
    description: 'DOM product configurations',
    isArray: true,
    type: GetDomProductConfigResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getProductConfigurations(): GetDomProductConfigResponse[] {
    return this.domService.getProductConfigurations();
  }
}
