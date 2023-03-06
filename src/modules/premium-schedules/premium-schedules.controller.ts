import { BadRequestException, Body, Controller, Get, HttpStatus, Param, ParseArrayPipe, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreatePremiumScheduleDto } from './dto/create-premium-schedule.dto';
import { GetPremiumScheduleParamDto } from './dto/get-premium-schedule-param.dto';
import { PremiumScheduleEntity } from './entities/premium-schedule.entity';
import { PremiumSchedulesService } from './premium-schedules.service';

@ApiTags('premium-schedules')
@Controller('')
export class PremiumSchedulesController {
  constructor(private readonly premiumSchedulesService: PremiumSchedulesService) {}

  @Post('premium/schedule')
  @ApiOperation({ summary: 'Create Premium Schedule sequence (aka Income exposure)' })
  @ApiBody({ type: [CreatePremiumScheduleDto] })
  @ApiResponse({ status: 201, description: 'Created.' })
  create(
    @Res({ passthrough: true }) res: Response,
    @Body(new ParseArrayPipe({ items: CreatePremiumScheduleDto, optional: false })) createPremiumSchedule: CreatePremiumScheduleDto[],
  ) {
    if (!createPremiumSchedule.length) {
      throw new BadRequestException('Request payload is empty');
    }

    return this.premiumSchedulesService.create(res, createPremiumSchedule[0]);
  }

  @Get('premium/segments/:facilityId')
  @ApiResponse({
    status: 200,
    type: [PremiumScheduleEntity],
  })
  @ApiParam({
    name: 'facilityId',
    required: true,
    type: 'string',
    description: 'UKEF facility id',
    example: '10588388',
  })
  find(@Param() param: GetPremiumScheduleParamDto): Promise<PremiumScheduleEntity[]> {
    return this.premiumSchedulesService.find(param.facilityId);
  }
}
