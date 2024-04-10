import { Controller, Get, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetAddressByPostcodeQueryDto } from './dto/get-address-by-postcode-query.dto';
import { GetSearchAddressesResponse, GetSearchAddressesResponseItem } from './dto/get-search-addresses-response.dto';
import { GeospatialService } from './geospatial.service';

@ApiTags('geospatial')
@Controller('geospatial')
export class GeospatialController {
  constructor(private readonly geospatialService: GeospatialService) {}

  @Get('addresses/postcode')
  @ApiOperation({
    summary: "A search based on a property's postcode. Will accept a full postcode consisting of the area, district, sector and unit e.g. SO16 0AS.",
  })
  @ApiResponse({
    status: 200,
    description: 'Returns addresses from Ordanance survey Delivery Point Address (DPA) system.',
    type: [GetSearchAddressesResponseItem],
  })
  @ApiNotFoundResponse({
    description: 'Customer not found.',
  })
  getGeospatial(@Query() query: GetAddressByPostcodeQueryDto): Promise<GetSearchAddressesResponse> {
    return this.geospatialService.getAddressesByPostcode(query.postcode);
  }
}
