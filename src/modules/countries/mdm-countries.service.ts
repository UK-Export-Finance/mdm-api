import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MdmCountryEntity } from './entities/mdm-country.entity';

@Injectable()
export class MdmCountriesService {
  constructor(
    @InjectRepository(MdmCountryEntity)
    private readonly countriesRepository: Repository<MdmCountryEntity>,
  ) {}

  findAll(): Promise<MdmCountryEntity[]> {
    return this.countriesRepository.find();
  }

  findOne(id: number): Promise<MdmCountryEntity> {
    return this.countriesRepository.findOneBy({ countryId: id });
  }
}
