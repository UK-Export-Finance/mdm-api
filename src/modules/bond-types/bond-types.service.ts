import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BondTypeEntity } from './entities/bond-types.entity';

@Injectable()
export class BondTypeService {
  constructor(
    @InjectRepository(BondTypeEntity)
    private readonly creditRiskRating: Repository<BondTypeEntity>,
  ) {}

  findAll(): Promise<BondTypeEntity[]> {
    return this.creditRiskRating.find();
  }

  findOne(id: number): Promise<BondTypeEntity> {
    return this.creditRiskRating.findOneBy({ creditRiskRatingId: id });
  }
}
