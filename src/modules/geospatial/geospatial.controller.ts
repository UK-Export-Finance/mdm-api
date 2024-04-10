import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { GetSearchPostcodeOrdnanceSurveyQueryDto } from '@ukef/helper-modules/ordnance-survey/dto/get-search-postcode-query.dto';
import { GeospatialService } from './geospatial.service';
import { GetAddressByPostcodeQueryDto } from './dto/get-address-by-postcode-query.dto';
import { GetSearchAddressesResponse, GetSearchAddressesResponseItem } from './dto/get-search-addresses-response.dto';

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
    description: 'AddressBase® Premium Basic Land and Property Units (BLPUs) can reference two types of address and with the OS Places API it is possible to search for one at a time, or both. These are the Delivery Point Address (DPA) and the Land and Property Identifier (LPI).',
    type: [GetSearchAddressesResponseItem],
  })
  @ApiNotFoundResponse({
    description: 'Customer not found.',
  })
  getGeospatial(@Query() query: GetAddressByPostcodeQueryDto): Promise<GetSearchAddressesResponse> {
    return this.geospatialService.getAddressesByPostcode(query.postcode);
  }
}
