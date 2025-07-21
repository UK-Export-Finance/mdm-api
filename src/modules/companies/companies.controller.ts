import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { CompaniesService } from './companies.service';
import { GetCompanyByRegistrationNumberQuery } from './dto/get-company-by-registration-number-query.dto';
import { GetCompanyResponse } from './dto/get-company-response.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get company by Companies House registration number',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the company matching the Companies House registration number.',
    type: GetCompanyResponse,
  })
  @ApiBadRequestResponse({
    description: 'Invalid Companies House registration number.',
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  @ApiUnprocessableEntityResponse({
    description: 'Company is an overseas company. UKEF can only process applications from companies based in the UK.',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error.',
  })
  getCompanyByRegistrationNumber(@Query() query: GetCompanyByRegistrationNumberQuery): Promise<GetCompanyResponse> {
    return this.companiesService.getCompanyByRegistrationNumber(query.registrationNumber);
  }
}
