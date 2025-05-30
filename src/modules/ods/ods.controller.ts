import { Controller, Get, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags, ApiBadRequestResponse, ApiOkResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { OdsService } from './ods.service';
import { GetOdsCustomerParamDto, GetOdsCustomerResponse } from './dto';

@ApiTags('ods')
@Controller('ods')
export class OdsController {
  constructor(private readonly odsService: OdsService) {}

  @Get('customers/:urn')
  @ApiOperation({
    summary: 'Get customers from ODS',
  })
  @ApiOkResponse({
    description: 'Customers matching search parameters',
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
}
