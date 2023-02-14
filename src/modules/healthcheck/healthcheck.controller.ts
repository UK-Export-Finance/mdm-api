import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, MemoryHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@ApiBearerAuth()
@ApiTags('healthcheck')
@Controller('')
export class HealthcheckController {
  constructor(
    @InjectDataSource('mssql-number-generator')
    private numberGenerator: DataSource,
    @InjectDataSource('mssql-cedar')
    private cedar: DataSource,
    @InjectDataSource('mssql-cis')
    private cis: DataSource,
    @InjectDataSource('mssql-mdm')
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
      () => this.db.pingCheck('mssql-number-generator', { connection: this.numberGenerator }),
      () => this.db.pingCheck('mssql-cedar', { connection: this.cedar }),
      () => this.db.pingCheck('mssql-cis', { connection: this.cis }),
      () => this.db.pingCheck('mssql-mdm', { connection: this.mdm }),
      () => this.mem.checkHeap('mem_heap', 512 * 2 ** 20 /* 512 MB */),
    ]);
  }
}
