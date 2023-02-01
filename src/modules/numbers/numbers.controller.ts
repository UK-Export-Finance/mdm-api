import { Body, Controller, Get, Query, Post, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NumbersService } from './numbers.service';
import { CreateNumberDto } from './dto/create-number.dto';
import { UkefNumber } from './entities/number.entity';

@ApiBearerAuth()
@ApiTags('numbers')
@Controller('numbers')
export class NumbersController {
  constructor(private readonly numberService: NumbersService) {}

  @Post()
  @ApiOperation({ summary: 'Create Number' })
  @ApiBody({ type: [CreateNumberDto]})
  @ApiResponse({ status: 201, description: 'Created.' })
  async create(@Body() ukefIDRecord: CreateNumberDto[]): Promise<UkefNumber[]> {
    const createResult = await this.numberService.create(ukefIDRecord);
    return createResult;
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get information about UKEF Id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Number,
  })
  async findOne(@Query('typeId') typeId: number, @Query('number') ukefID: string): Promise<any> {
    const UkefIdInfo = await this.numberService.findOne(typeId, ukefID);
    return [UkefIdInfo];
  }

}
