import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BondTypeController } from './bond-types.controller';
import { BondTypeService } from './bond-types.service';
import { BondTypeEntity } from './entities/bond-types.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BondTypeEntity])],
  controllers: [BondTypeController],
  providers: [BondTypeService],
})
export class BondTypeModule {}
