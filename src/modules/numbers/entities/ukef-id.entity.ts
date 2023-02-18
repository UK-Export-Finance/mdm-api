import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'UNIQUE_NUMBER_DEAL_FACILITY',
  schema: 'dbo',
})
export class UkefId {
  /**
   * UKEF ID record from "NUMBER_GENERATION" DB
   * @example
   */
  @PrimaryGeneratedColumn({ name: 'DEAL_FACILITY_ID' })
  @ApiProperty({ example: '20057861', description: "Internal id, don't use" })
  id?: number;

  @Column({ name: 'DEAL_FACILITY_ID_MASK' })
  @ApiProperty({ example: '0030570680', description: 'UKEF ID to use' })
  maskedId: string;

  @Column({ name: 'NBR_TYPE_ID' })
  @ApiProperty({ example: 1 })
  type: number;

  @Column({ name: 'CREATED_BY_USER' })
  @ApiProperty({ example: 'ECGD\\jsmith', description: 'User if it is known' })
  createdBy: string;

  @Column({ name: 'CREATED_DATETIME' })
  @ApiProperty({ example: '2021-11-30T09:44:04.15Z', description: 'Created timestamp' })
  createdDatetime: string;

  @Column({ name: 'REQUESTING_SYSTEM' })
  @ApiProperty({ example: 'NodeJs/App' })
  requestingSystem: Date;
}
