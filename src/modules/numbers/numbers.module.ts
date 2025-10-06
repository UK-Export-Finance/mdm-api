import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';

import { UkefId } from './entities/ukef-id.entity';
import { NumbersController } from './numbers.controller';
import { NumbersService } from './numbers.service';

@Module({
  imports: [TypeOrmModule.forFeature([UkefId], DATABASE_NAME.NUMBER_GENERATOR)],
  controllers: [NumbersController],
  providers: [NumbersService],
  exports: [NumbersService],
})
export class NumbersModule {}
