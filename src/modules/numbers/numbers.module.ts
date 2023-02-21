import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UkefId } from './entities/ukef-id.entity';
import { NumbersController } from './numbers.controller';
import { NumbersService } from './numbers.service';

@Module({
  imports: [TypeOrmModule.forFeature([UkefId], 'mssql-number-generator')],
  controllers: [NumbersController],
  providers: [NumbersService],
})
export class NumbersModule {}
