import { CacheInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NumberTypesService } from './number-types.service';
import { NumberType } from './entities/number-type.entity';

@ApiBearerAuth()
@ApiTags('number-types')
@Controller('number-types')
export class NumberTypesController {
  constructor(private readonly numberTypeService: NumberTypesService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({ summary: 'Get all Number generator types' })
  @ApiResponse({
    status: 200,
    description: 'Get all Number generator types',
    type: NumberType,
  })
  findAll(): Promise<any> {
    return this.numberTypeService.findAll();
  }
}
