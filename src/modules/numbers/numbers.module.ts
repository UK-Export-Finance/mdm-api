import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UkefNumber as Number } from './entities/number.entity';
import { NumberType } from './entities/number-type.entity';
import { NumbersController } from './numbers.controller';
import { NumbersService } from './numbers.service';
import { NumberTypesController } from './number-types.controller';
import { NumberTypesService } from './number-types.service';


@Module({
  imports: [TypeOrmModule.forFeature([Number, NumberType], 'mssql-number-generator')],
  controllers: [NumbersController, NumberTypesController],
  providers: [NumbersService, NumberTypesService],
})
export class NumbersModule {}
