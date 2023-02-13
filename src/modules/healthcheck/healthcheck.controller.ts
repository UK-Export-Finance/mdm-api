import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthcheckService } from './healthcheck.service';

@ApiBearerAuth()
@ApiTags('healthcheck')
@Controller('')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}

  @Get('live')
  @ApiOperation({ summary: 'live' })
  @ApiResponse({ status: 200, description: 'Check if this api is running' })
  live(): object {
    return {
      status: 200,
      message: 'Online',
      datetime: new Date().toISOString(),
    };
  }

  @Get('healthcheck')
  @ApiOperation({ summary: 'Alias for /ready' })
  @ApiResponse({ status: 200, description: 'Check if this api is running' })
  healthcheck(): object {
    return this.ready();
  }

  @Get('ready')
  @ApiOperation({ summary: 'ready' })
  @ApiResponse({ status: 200, description: 'Check if this api can access dependencies' })
  async ready(): Promise<object> {
    return {
      status: 200,
      message: 'Ready',
      datetime: new Date().toISOString(),
      tests: {
        databases: await this.healthcheckService.checkAllDatabases(),
      },
    };
  }

  @Get('force-sql-error')
  @ApiOperation({ summary: 'Test how errors are handled, what response is returned' })
  @ApiResponse({
    status: 200,
    description: 'Test SQL error',
    type: Number,
  })
  triggerTestSqlError(): Promise<string>[] {
    return [this.healthcheckService.triggerTestSqlError()];
  }

  @Get('force-exception-error')
  @ApiOperation({ summary: 'Test how errors are handled, what response is returned' })
  @ApiResponse({
    status: 200,
    description: 'Test Exception error',
    type: Number,
  })
  triggerExceptionError(): Promise<object>[] {
    throw new Error('NEW generic exception');
  }
}
