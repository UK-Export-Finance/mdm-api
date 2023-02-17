import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'NBR_TYPES',
  schema: 'dbo',
})
export class NumberType {
  /**
   * Number type id.
   * @example 1
   */
  @PrimaryGeneratedColumn({ name: 'NBR_TYPE_ID' })
  id?: number;

  @Column({ name: 'NBR_TYPE_DESC' })
  @ApiProperty({ example: 'France' })
  desc: string;

  @Column({ name: 'MASK' })
  @ApiProperty()
  mask: string;

  @Column({ name: 'FORMAT_START_NBR' })
  @ApiProperty()
  formatStartNumber: string;

  @Column({ name: 'FORMAT_END_NBR' })
  @ApiProperty()
  formatEndNumber: string;

  @Column({ name: 'EFF_FROM' })
  @ApiProperty()
  effectiveFromDatetime: Date;

  @Column({ name: 'EFF_TO' })
  @ApiProperty()
  effectiveToDatetime: Date;

  @Column({ name: 'CREATED_BY_USER' })
  @ApiProperty()
  createdBy: string;

  @Column({ name: 'CREATED_DATETIME' })
  @ApiProperty()
  createdDatetime: Date;

  @Column({ name: 'UPD_USER' })
  @ApiProperty()
  updatedBy: string;

  @Column({ name: 'UPD_DATETIME' })
  @ApiProperty()
  updatedDatetime: Date;
}
