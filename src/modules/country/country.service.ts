import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countriesRepository: Repository<CountryEntity>,
  ) {}

  findOne(id: number): Promise<CountryEntity> {
    return this.countriesRepository.findOneBy({ countryId: id });
  }

  findByIso(iso: string): Promise<CountryEntity> {
    return this.countriesRepository.findOneBy({ isoCode: iso });
  }
}
