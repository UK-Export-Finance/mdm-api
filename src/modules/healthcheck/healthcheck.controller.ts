import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE_NAME } from '@ukef/constants';
import { DataSource } from 'typeorm';

@ApiTags('healthcheck')
@Controller('')
export class HealthcheckController {
  constructor(
    @InjectDataSource(DATABASE_NAME.NUMBER_GENERATOR)
    private numberGenerator: DataSource,
    @InjectDataSource(DATABASE_NAME.CEDAR)
    private cedar: DataSource,
    @InjectDataSource(DATABASE_NAME.CIS)
    private cis: DataSource,
    @InjectDataSource(DATABASE_NAME.MDM)
    private mdm: DataSource,
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private readonly mem: MemoryHealthIndicator,
  ) {}

  @Get('ready')
  @HealthCheck()
  @ApiResponse({ status: 200, description: 'API micro-service health check performs dependent databases connection and memory heap check' })
  @ApiOperation({ summary: 'ready' })
  check() {
    return this.health.check([
      () => this.db.pingCheck(DATABASE_NAME.NUMBER_GENERATOR, { connection: this.numberGenerator }),
      () => this.db.pingCheck(DATABASE_NAME.CEDAR, { connection: this.cedar }),
      () => this.db.pingCheck(DATABASE_NAME.CIS, { connection: this.cis }),
      () => this.db.pingCheck(DATABASE_NAME.MDM, { connection: this.mdm }),
      () => this.mem.checkHeap('mem_heap', 512 * 2 ** 20 /* 512 MB */),
    ]);
  }
}
