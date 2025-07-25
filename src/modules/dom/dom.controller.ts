import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import AppConfig from '@ukef/config/app.config';

import { DomService } from './dom.service';
import { GetDomBusinessCentreMappedResponse, GetDomProductConfigurationResponse } from './dto';

const { domOdsVersioning } = AppConfig();

@ApiTags('dom')
@Controller({
  path: 'dom',
  version: domOdsVersioning.version,
})
export class DomController {
  constructor(private readonly domService: DomService) {}

  @Get('business-centres')
  @ApiOperation({
    summary: 'Get business centres from DOM',
  })
  @ApiOkResponse({
    description: 'DOM Business centres',
    isArray: true,
    type: GetDomBusinessCentreMappedResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getBusinessCentres(): Promise<GetDomBusinessCentreMappedResponse[]> {
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
