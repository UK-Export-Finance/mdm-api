import { BadRequestException, Body, Controller, Get, ParseArrayPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUkefIdDto } from './dto/create-ukef-id.dto';
import { GetNumbersQueryDto } from './dto/get-numbers-query.dto';
import { UkefId } from './entities/ukef-id.entity';
import { NumbersService } from './numbers.service';

@ApiBearerAuth()
@ApiTags('numbers')
@Controller('numbers')
export class NumbersController {
  constructor(private readonly numberService: NumbersService) {}

  @Post()
  @ApiOperation({ summary: 'Create Number' })
  @ApiBody({ type: [CreateUkefIdDto] })
  create(@Body(new ParseArrayPipe({ items: CreateUkefIdDto, optional: false })) createUkefIdDtos: CreateUkefIdDto[]): Promise<UkefId[]> {
    if (!createUkefIdDtos.length) {
      throw new BadRequestException('Request payload is empty');
    }
    return this.numberService.create(createUkefIdDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Get information about UKEF ID' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UkefId],
  })
  findOne(@Query() query: GetNumbersQueryDto): Promise<UkefId> {
    return this.numberService.findOne(query.type, query.ukefId);
  }
}
