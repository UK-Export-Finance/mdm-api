import { Controller, Get, Param, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CountryEntity } from './entities/country.entity';

@ApiBearerAuth()
@ApiTags('country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get(':id')
  @Version('1')
  @ApiResponse({
    status: 200,
    description: 'GET Active Country By ID',
    type: CountryEntity,
  })
  findOneById(@Param('id') id: number): Promise<CountryEntity> {
    return this.countryService.findOne(id);
  }

  @Get('/iso2/:iso')
  @Version('1')
  @ApiResponse({
    status: 200,
    description: 'Get Active Country By ISO 2 Code',
    type: CountryEntity,
  })
  findOneByIso(@Param('iso') iso: string): Promise<CountryEntity> {
    return this.countryService.findByIso(iso);
  }
}
