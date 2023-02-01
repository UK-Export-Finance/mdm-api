import { Controller, Get, Version } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HealtcheckService } from './healtcheck.service';

@ApiBearerAuth()
@ApiTags('healtcheck')
//@Controller('healtcheck')
@Controller('')
export class HealtcheckController {
  constructor(private readonly healtcheckService: HealtcheckService) {}

  @Get('/live')
  @Version('1')
  @ApiOperation({ summary: 'live' })
  @ApiResponse({ status: 200, description: 'Check if this api is running'})
  live(): any {
    return {
      status: 200,
      message: "Online",
      datetime: new Date().toISOString()
    };
  }

  @Get('healtcheck')
  @Version('1')
  @ApiOperation({ summary: 'Alias for /ready' })
  @ApiResponse({ status: 200, description: 'Check if this api is running'})
  healtcheck(): any {
    return this.ready();
  }

  @Get('ready')
  @Version('1')
  @ApiOperation({ summary: 'ready' })
  @ApiResponse({ status: 200, description: 'Check if this api can access dependencies'})
  async ready(): Promise<any> {
    return {
      status: 200,
      message: "Ready",
      datetime: new Date().toISOString(),
      tests: {
        databases: await this.healtcheckService.checkAllDatabases()
      }
    };
  }

  @Get('force-sql-error')
  @Version('1')
  @ApiOperation({ summary: 'Test how errors are handled, what response is returned' })
  @ApiResponse({
    status: 200,
    description: 'Test SQL error',
    type: Number,
  })
  async triggerTestSqlError(): Promise<any> {
    return [this.healtcheckService.triggerTestSqlError()];
  }

  @Get('force-exception-error')
  @Version('1')
  @ApiOperation({ summary: 'Test how errors are handled, what response is returned' })
  @ApiResponse({
    status: 200,
    description: 'Test Exception error',
    type: Number,
  })
  async triggerExceptionError(): Promise<any> {
    throw new Error('NEW generic exception');
  }
  
}
