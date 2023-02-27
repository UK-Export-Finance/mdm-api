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
  @UsePipes(ValidationPipe)
  @ApiResponse({ status: 201, description: 'Created.' })
  create(@Body(new ParseArrayPipe({ items: CreateUkefIdDto, optional: false })) CreateUkefIdDtos: CreateUkefIdDto[]): Promise<UkefId[]> {
    if (!CreateUkefIdDtos.length) {
      throw new BadRequestException('Request payload is empty');
    }
    return this.numberService.create(CreateUkefIdDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Get information about UKEF ID' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [UkefId],
  })
  @ApiQuery({
    name: 'type',
    required: true,
    type: 'int',
    description: 'Id of number type. Common types are: 1 for Deal/Facility, 2 for Party, 8 for Covenant',
    example: 1,
  })
  @ApiQuery({
    name: 'ukefID',
    type: 'string',
    required: true,
    description: 'UKEF ID to check',
    example: '0030052431',
  })
  findOne(@Query() query: GetNumbersQueryDto): Promise<UkefId> {
    return this.numberService.findOne(query.type, query.ukefId);
  }
}
