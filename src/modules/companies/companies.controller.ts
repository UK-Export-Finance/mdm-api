import { Controller, Get, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CompaniesService } from './companies.service';
import { GetCompanyByRegistrationNumberQuery } from './dto/get-company-by-registration-number-query.dto';
import { GetCompanyResponse } from './dto/get-company-response.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get company by Companies House registration number.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the company',
    type: GetCompanyResponse,
  })
  @ApiNotFoundResponse({
    description: 'Company not found.',
  })
  getCompanyByRegistrationNumber(@Query() query: GetCompanyByRegistrationNumberQuery): Promise<GetCompanyResponse> {
    return this.companiesService.getCompanyByRegistrationNumber(query.registrationNumber);
  }
}
