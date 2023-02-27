import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';

import { ConstantsController } from './constants.controller';
import { ConstantsService } from './constants.service';
import { ConstantSpiEntity } from './entities/constants-spi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConstantSpiEntity], DATABASE.CIS)],
  controllers: [ConstantsController],
  providers: [ConstantsService],
})
export class ConstantsModule {}
