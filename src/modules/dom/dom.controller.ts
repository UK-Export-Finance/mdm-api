import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import AppConfig from '@ukef/config/app.config';

import { DomService } from './dom.service';
import { GetDomBusinessCentreParamDto, GetDomBusinessCentreResponse, GetDomProductConfigurationResponse } from './dto';

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
    description: 'A DOM Business centre ',
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
  async findBusinessCentre(@Param() param: GetDomBusinessCentreParamDto): Promise<GetDomBusinessCentreResponse> {
    return await this.domService.findBusinessCentre(param.centreCode);
  }

  @Get('business-centres')
  @ApiOperation({
    summary: 'Get business centres from DOM',
  })
  @ApiOkResponse({
    description: 'DOM Business centres',
    isArray: true,
    type: GetDomBusinessCentreResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getBusinessCentres(): Promise<GetDomBusinessCentreResponse[]> {
    return this.domService.getBusinessCentres();
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
