import { Controller, Get, Param } from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import AppConfig from '@ukef/config/app.config';

import {
  FindCounterpartyRoleParamDto,
  FindOdsIndustryParamDto,
  GetAccrualFrequencyResponseDto,
  GetAccrualScheduleClassificationResponseDto,
  GetAccrualScheduleOdsResponseDto,
  GetCounterpartyRoleResponseDto,
  GetFacilityCategoryResponseDto,
  GetIndustryResponseDto,
  GetObligationSubtypeResponseDto,
  GetOdsAccrualFrequencyParamDto,
  GetOdsAccrualScheduleClassificationParamDto,
  GetOdsAccrualScheduleParamDto,
  GetOdsCustomerParamDto,
  GetOdsCustomerResponse,
  GetOdsDealParamDto,
  GetOdsDealResponse,
  GetOdsFacilityCategoryParamDto,
  GetOdsObligationSubtypeParamDto,
  ObligationSubtypeWithProductTypeDto,
} from './dto';
import { OdsService } from './ods.service';
import { OdsAccrualScheduleService } from './ods-accrual-schedule.service';
import { OdsAccrualsService } from './ods-accruals.service';
import { OdsCounterpartyRoleService } from './ods-counterparty-role.service';
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
    private readonly odsAccrualScheduleService: OdsAccrualScheduleService,
    private readonly odsCounterpartyRoleService: OdsCounterpartyRoleService,
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

  @Get('accrual-frequency/:frequencyCode')
  @ApiOperation({
    summary: 'Get an accrual frequency from ODS',
  })
  @ApiOkResponse({
    description: 'ODS frequency',
    type: GetAccrualFrequencyResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Accrual frequency not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findAccrualFrequency(@Param() param: GetOdsAccrualFrequencyParamDto): Promise<GetAccrualFrequencyResponseDto> {
    return this.odsAccrualsService.findAccrualFrequency(param.frequencyCode);
  }

  @Get('accrual-schedules')
  @ApiOperation({
    summary: 'Get accrual schedules from ODS',
  })
  @ApiOkResponse({
    description: 'ODS accrual schedules',
    isArray: true,
    type: GetAccrualScheduleOdsResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getAccrualSchedules(): Promise<GetAccrualScheduleOdsResponseDto[]> {
    return this.odsAccrualScheduleService.getAll();
  }

  @Get('accrual-schedule/:scheduleCode')
  @ApiOperation({
    summary: 'Get an accrual schedule from ODS',
  })
  @ApiOkResponse({
    description: 'ODS accrual schedule',
    type: GetAccrualScheduleOdsResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Accrual schedule not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findAccrualSchedule(@Param() param: GetOdsAccrualScheduleParamDto): Promise<GetAccrualScheduleOdsResponseDto> {
    return this.odsAccrualScheduleService.findOne(param.scheduleCode);
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

  @Get('counterparty-roles')
  @ApiOperation({
    summary: 'Get counterparty roles from ODS',
  })
  @ApiOkResponse({
    description: 'ODS counterparty roles',
    isArray: true,
    type: GetCounterpartyRoleResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getCounterpartyRoles(): Promise<GetCounterpartyRoleResponseDto[]> {
    return this.odsCounterpartyRoleService.getAll();
  }

  @Get('counterparty-role/:roleType')
  @ApiOperation({
    summary: 'Get a counterparty role from ODS',
  })
  @ApiOkResponse({
    description: 'ODS counterparty role',
    type: GetCounterpartyRoleResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Counterparty role not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  findCounterpartyRole(@Param() param: FindCounterpartyRoleParamDto): Promise<GetCounterpartyRoleResponseDto> {
    return this.odsCounterpartyRoleService.findOne(param.roleType);
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

  @Get('obligation-subtypes/with-product-type-codes')
  @ApiOperation({
    summary: 'Get obligation subtypes with product type codes from ODS',
  })
  @ApiOkResponse({
    description: 'ODS obligation subtypes with product type codes',
    isArray: true,
    type: ObligationSubtypeWithProductTypeDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  getObligationSubtypesWithProductCodes(): Promise<ObligationSubtypeWithProductTypeDto[]> {
    return this.odsObligationSubtypeService.getAllWithProductTypes();
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
