import { BadRequestException, Body, Controller, Get, Param, ParseArrayPipe, Post, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { CreatePremiumScheduleDto } from './dto/create-premium-schedule.dto';
import { GetPremiumScheduleParamDto } from './dto/get-premium-schedule-param.dto';
import { PremiumScheduleEntity } from './entities/premium-schedule.entity';
import { PremiumSchedulesService } from './premium-schedules.service';

@ApiTags('premium-schedules')
@Controller('premium-schedules')
export class PremiumSchedulesController {
  constructor(private readonly premiumSchedulesService: PremiumSchedulesService) {}

  @Post('premium/schedule')
  @ApiOperation({ summary: 'Create a premium schedule sequence (AKA Income exposure)' })
  @ApiBody({ type: [CreatePremiumScheduleDto] })
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
  @ApiOperation({ summary: 'Return previously generated premium schedule sequence/segments (AKA Income exposures)' })
  @ApiResponse({
    status: 200,
    type: [PremiumScheduleEntity],
  })
  find(@Param() param: GetPremiumScheduleParamDto): Promise<PremiumScheduleEntity[]> {
    return this.premiumSchedulesService.find(param.facilityId);
  }
}
