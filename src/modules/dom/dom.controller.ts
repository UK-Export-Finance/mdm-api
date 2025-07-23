import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import AppConfig from '@ukef/config/app.config';

import { DomService } from './dom.service';
import { GetDomProductConfigurationResponse } from './dto';

const { domOdsVersioning } = AppConfig();

@ApiTags('dom')
@Controller({
  path: 'dom',
  version: domOdsVersioning.version,
})
export class DomController {
  constructor(private readonly domService: DomService) {}

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
