import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetAddressesByPostcodeQueryDto } from './dto/get-addresses-by-postcode-query.dto';
import { GetAddressesResponse, GetAddressesResponseItem } from './dto/get-addresses-response.dto';
import { GeospatialService } from './geospatial.service';

@ApiTags('geospatial')
@Controller('geospatial')
export class GeospatialController {
  constructor(private readonly geospatialService: GeospatialService) {}

  @Get('addresses/postcode')
  @ApiOperation({
    summary: 'Get addresses from Ordnance Survey Delivery Point Address (DPA) system by postcode. Will accept a full valid postcode',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns simplified addresses that are ready to show to users.',
    type: [GetAddressesResponseItem],
  })
  @ApiNotFoundResponse({
    description: 'No addresses found',
  })
  getAddressesByPostcode(@Query() query: GetAddressesByPostcodeQueryDto): Promise<GetAddressesResponse> {
    return this.geospatialService.getAddressesByPostcode(query.postcode);
  }
}
