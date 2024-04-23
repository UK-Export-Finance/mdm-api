import { Controller, Get, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetAddressByPostcodeQueryDto } from './dto/get-address-by-postcode-query.dto';
import { GetAddressesResponse, GetAddressesResponseItem } from './dto/get-addresses-response.dto';
import { GeospatialService } from './geospatial.service';

@ApiTags('geospatial')
@Controller('geospatial')
export class GeospatialController {
  constructor(private readonly geospatialService: GeospatialService) {}

  @Get('addresses/postcode')
  @ApiOperation({
    summary:
      "A search based on a property's postcode. Will accept a full valid postcode. Returns addresses from Ordnance survey Delivery Point Address (DPA) system.",
  })
  @ApiResponse({
    status: 200,
    description: 'Returns simplified addresses that are ready to show to users.',
    type: [GetAddressesResponseItem],
  })
  @ApiNotFoundResponse({
    description: 'Customer not found.',
  })
  getAddressesByPostcode(@Query() query: GetAddressByPostcodeQueryDto): Promise<GetAddressesResponse> {
    return this.geospatialService.getAddressesByPostcode(query.postcode);
  }
}