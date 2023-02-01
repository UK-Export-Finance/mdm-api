import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditRiskRatingEntity } from './entities/credit-risk-rating.entity';

@Injectable()
export class CreditRiskRatingService {
  constructor(
    @InjectRepository(CreditRiskRatingEntity)
    private readonly creditRiskRating: Repository<CreditRiskRatingEntity>,
  ) {}

  findAll(): Promise<CreditRiskRatingEntity[]> {
    return this.creditRiskRating.find();
  }

  findOne(id: number): Promise<CreditRiskRatingEntity> {
    return this.creditRiskRating.findOneBy({ creditRiskRatingId: id });
  }
}
