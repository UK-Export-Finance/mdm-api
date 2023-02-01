import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MdmCountryEntity } from './entities/mdm-country.entity';
import { MdmCountriesController } from './mdm-countries.controller';
import { MdmCountriesService } from './mdm-countries.service';

@Module({
  imports: [TypeOrmModule.forFeature([MdmCountryEntity])],
  controllers: [MdmCountriesController],
  providers: [MdmCountriesService],
})
export class MdmCountriesModule {}
