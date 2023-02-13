import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NumberType } from './entities/number-type.entity';
import { UkefId } from './entities/ukef-id.entity';
import { NumberTypesController } from './number-types.controller';
import { NumberTypesService } from './number-types.service';
import { NumbersController } from './numbers.controller';
import { NumbersService } from './numbers.service';

@Module({
  imports: [TypeOrmModule.forFeature([UkefId, NumberType], 'mssql-number-generator')],
  controllers: [NumbersController, NumberTypesController],
  providers: [NumbersService, NumberTypesService],
})
export class NumbersModule {}
