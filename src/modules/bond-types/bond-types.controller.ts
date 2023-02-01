import { Controller, Get, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BondTypeService } from './bond-types.service';
import { BondTypeEntity } from './entities/bond-types.entity';

@Controller('bond-types')
@ApiBearerAuth()
@ApiTags('credit-risk-rating')
export class BondTypeController {
  constructor(private readonly creditRiskRating: BondTypeService) {}

  @Get()
  @Version('1')
  @ApiResponse({
    status: 200,
    description: 'Get all active countries',
    type: BondTypeEntity,
  })
  findAll(): Promise<BondTypeEntity[]> {
    return this.creditRiskRating.findAll();
  }
}
