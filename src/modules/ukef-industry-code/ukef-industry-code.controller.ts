import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CompaniesHouseIndustryCodeParamDto, CompaniesHouseIndustryCodeResponseDto } from './dto';
import { UkefIndustryCodeService } from './ukef-industry-code.service';

@ApiTags('ukef-industry-code')
@Controller('ukef-industry-code')
export class UkefIndustryCodeController {
  constructor(private readonly ukefIndustryCodeService: UkefIndustryCodeService) {}

  @Get('by-companies-house-industry-code/:industryCode')
  @ApiOperation({
    summary: 'Get a UKEF industry code by Companies House industry code. Sourced from MDM database',
  })
  @ApiOkResponse({
    description: 'The UKEF industry code from MDM database',
    type: CompaniesHouseIndustryCodeResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Industry not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameters provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async findUkefIndustryCode(@Param() param: CompaniesHouseIndustryCodeParamDto): Promise<CompaniesHouseIndustryCodeResponseDto> {
    return await this.ukefIndustryCodeService.find(Number(param.industryCode));
  }
}
