import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DATABASE } from '@ukef/constants';
import { DataSource } from 'typeorm';

@ApiBearerAuth()
@ApiTags('healthcheck')
@Controller('')
export class HealthcheckController {
  constructor(
    @InjectDataSource(DATABASE.NUMBER_GENERATOR)
    private numberGenerator: DataSource,
    @InjectDataSource(DATABASE.CEDAR)
    private cedar: DataSource,
    @InjectDataSource(DATABASE.CIS)
    private cis: DataSource,
    @InjectDataSource(DATABASE.MDM)
    private mdm: DataSource,
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private readonly mem: MemoryHealthIndicator,
  ) {}

  @Get('ready')
  @HealthCheck()
  @ApiResponse({ status: 200, description: 'Check if this api can access dependencies' })
  @ApiOperation({ summary: 'ready' })
  check() {
    return this.health.check([
      () => this.db.pingCheck(DATABASE.NUMBER_GENERATOR, { connection: this.numberGenerator }),
      () => this.db.pingCheck(DATABASE.CEDAR, { connection: this.cedar }),
      () => this.db.pingCheck(DATABASE.CIS, { connection: this.cis }),
      () => this.db.pingCheck(DATABASE.MDM, { connection: this.mdm }),
      () => this.mem.checkHeap('mem_heap', 512 * 2 ** 20 /* 512 MB */),
    ]);
  }
}
