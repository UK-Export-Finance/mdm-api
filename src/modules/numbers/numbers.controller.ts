import { Body, Controller, Get, ParseArrayPipe, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ValidateUkefId } from '../../helpers/validate-ukef-id.helpers';
import { CreateUkefIdDto } from './dto/create-ukef-id.dto';
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
  create(@Body(new ParseArrayPipe({ items: CreateUkefIdDto })) CreateUkefIdDtos: CreateUkefIdDto[]): Promise<UkefId[]> {
    return this.numberService.create(CreateUkefIdDtos);
  }

  @Get()
  @ApiOperation({ summary: 'Get information about UKEF ID' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UkefId,
  })
  @ApiParam({
    name: 'type',
    required: true,
    type: 'int',
    description: 'Id of number type. Common types are: 1 for Deal/Facility, 2 for Party, 8 for Covenant',
    example: 1,
  })
  @ApiParam({
    name: 'ukefID',
    type: 'string',
    required: true,
    description: 'UKEF ID to check',
    example: '0030052431',
  })
  findOne(@Query('type', new ParseIntPipe()) type: number, @Query('ukefId', new ValidateUkefId()) ukefIdString: string): Promise<UkefId> {
    return this.numberService.findOne(type, ukefIdString);
  }
}
