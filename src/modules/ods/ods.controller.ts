import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import AppConfig from '@ukef/config/app.config';

import {
  FindOdsIndustryParamDto,
  GetAccrualFrequencyResponseDto,
  GetAccrualScheduleClassificationResponseDto,
  GetFacilityCategoryResponseDto,
  GetIndustryResponseDto,
  GetObligationSubtypeResponseDto,
  GetOdsAccrualScheduleClassificationParamDto,
  GetOdsCustomerParamDto,
  GetOdsCustomerResponse,
  GetOdsDealParamDto,
  GetOdsDealResponse,
  GetOdsFacilityCategoryParamDto,
  GetOdsObligationSubtypeParamDto,
} from './dto';
import { OdsService } from './ods.service';
import { OdsAccrualsService } from './ods-accruals.service';
import { OdsFacilityCategoryService } from './ods-facility-category.service';
import { OdsObligationSubtypeService } from './ods-obligation-subtype.service';

const { domOdsVersioning } = AppConfig();

@ApiTags('ods')
@Controller({
  path: 'ods',
  version: domOdsVersioning.version,
})
export class OdsController {
  constructor(
    private readonly odsService: OdsService,
    private readonly odsAccrualsService: OdsAccrualsService,
    private readonly odsFacilityCategoryService: OdsFacilityCategoryService,
    private readonly odsObligationSubtypeService: OdsObligationSubtypeService,
  ) {}

  @Get('accrual-frequencies')
  @ApiOperation({
    summary: 'Get accrual frequencies from ODS',
  })
  @ApiOkResponse({
    description: 'ODS accrual frequencies',
    isArray: true,
    type: GetAccrualFrequencyResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getAccrualFrequencies(): Promise<GetAccrualFrequencyResponseDto[]> {
    return this.odsAccrualsService.getAccrualFrequencies();
  }

  @Get('accrual-schedule-classifications')
  @ApiOperation({
    summary: 'Get accrual schedule classifications from ODS',
  })
  @ApiOkResponse({
    description: 'ODS accrual schedule classifications',
    isArray: true,
    type: GetAccrualScheduleClassificationResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getAccrualScheduleClassifications(): Promise<GetAccrualScheduleClassificationResponseDto[]> {
    return this.odsAccrualsService.getScheduleClassifications();
  }

  @Get('accrual-schedule-classification/:classificationCode')
  @ApiOperation({
    summary: 'Get an accrual schedule classification from ODS',
  })
  @ApiOkResponse({
    description: 'ODS accrual schedule classification',
    type: GetAccrualScheduleClassificationResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Accrual schedule classification not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findAccrualScheduleClassification(@Param() param: GetOdsAccrualScheduleClassificationParamDto): Promise<GetAccrualScheduleClassificationResponseDto> {
    return this.odsAccrualsService.findScheduleClassification(param.classificationCode);
  }

  @Get('customers/:urn')
  @ApiOperation({
    summary: 'Get a customer from ODS',
  })
  @ApiOkResponse({
    description: 'A customer matching the provided URN',
    type: GetOdsCustomerResponse,
  })
  @ApiNotFoundResponse({
    description: 'Customer not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameters provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findCustomer(@Param() param: GetOdsCustomerParamDto): Promise<GetOdsCustomerResponse> {
    return this.odsService.findCustomer(param.urn);
  }

  @Get('deal/:id')
  @ApiOperation({
    summary: 'Get a deal from ODS',
  })
  @ApiOkResponse({
    description: 'A deal matching the provided deal ID',
    type: GetOdsDealResponse,
  })
  @ApiNotFoundResponse({
    description: 'Deal not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameters provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findDeal(@Param() param: GetOdsDealParamDto): Promise<GetOdsDealResponse> {
    return this.odsService.findDeal(param.id);
  }

  @Get('facility-categories')
  @ApiOperation({
    summary: 'Get facility categories from ODS',
  })
  @ApiOkResponse({
    description: 'ODS facility categories',
    isArray: true,
    type: GetFacilityCategoryResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getFacilityCategories(): Promise<GetFacilityCategoryResponseDto[]> {
    return this.odsFacilityCategoryService.getAll();
  }

  @Get('facility-category/:categoryCode')
  @ApiOperation({
    summary: 'Get a facility category from ODS',
  })
  @ApiOkResponse({
    description: 'A facility category matching the provided category code',
    type: GetFacilityCategoryResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Facility category not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameters provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findFacilityCategory(@Param() param: GetOdsFacilityCategoryParamDto): Promise<GetFacilityCategoryResponseDto> {
    return this.odsFacilityCategoryService.findOne(param.categoryCode);
  }

  @Get('obligation-subtypes')
  @ApiOperation({
    summary: 'Get obligation subtypes from ODS',
  })
  @ApiOkResponse({
    description: 'ODS obligation subtypes',
    isArray: true,
    type: GetObligationSubtypeResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getObligationSubtypes(): Promise<GetObligationSubtypeResponseDto[]> {
    return this.odsObligationSubtypeService.getAll();
  }

  @Get('obligation-subtype/:subtypeCode')
  @ApiOperation({
    summary: 'Get an obligation subtype from ODS',
  })
  @ApiOkResponse({
    description: 'An obligation subtype matching the provided subtype code',
    type: GetObligationSubtypeResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Obligation subtype not found',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameters provided',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findObligationSubtype(@Param() param: GetOdsObligationSubtypeParamDto): Promise<GetObligationSubtypeResponseDto> {
    return this.odsObligationSubtypeService.findOne(param.subtypeCode);
  }

  @Get('ukef-industries')
  @ApiOperation({
    summary: 'Get UKEF industries from ODS',
  })
  @ApiOkResponse({
    description: 'Mapped UKEF industries from ODS',
    isArray: true,
    type: GetIndustryResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getUkefIndustries(): Promise<GetIndustryResponseDto[]> {
    return this.odsService.getUkefIndustries();
  }

  @Get('ukef-industry-codes')
  @ApiOperation({
    summary: 'Get UKEF industry codes from ODS',
  })
  @ApiOkResponse({
    description: 'UKEF industry codes from ODS',
    isArray: true,
    type: String,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getUkefIndustryCodes(): Promise<string[]> {
    return this.odsService.getUkefIndustryCodes();
  }

  @Get('ukef-industry/:industryCode')
  @ApiOperation({
    summary: 'Get a UKEF industry from ODS',
  })
  @ApiOkResponse({
    description: 'Mapped UKEF industry code from ODS',
    type: GetIndustryResponseDto,
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
  findUkefIndustry(@Param() param: FindOdsIndustryParamDto): Promise<GetIndustryResponseDto> {
    return this.odsService.findUkefIndustry(param.industryCode);
  }
}
