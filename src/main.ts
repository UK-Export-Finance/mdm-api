import { Logger as NestLogger } from '@nestjs/common';
import { NestApplication, NestFactory } from '@nestjs/core';
import { MainModule } from '@ukef/main.module';

import { App } from './app';
import { REDACT_STRINGS } from './constants';
import { ConsoleLoggerWithRedact } from './logging/console-logger-with-redact';

/**
 * With `bufferLogs: true`, Nest only prints buffered bootstrap logs (e.g. TypeORM's "Unable to connect to
 * the database. Retrying..." errors) once bootstrap settles - on success they're replayed through PinoLogger,
 * on a hard failure they're flushed through the logger below. A dependency that is slow to fail, such as an
 * unreachable database that TypeORM keeps retrying, can leave bootstrap neither settling nor printing anything
 * for minutes, which looks like a hang. A healthy bootstrap always settles well inside this interval, so it never
 * fires and every log still goes through PinoLogger as normal; it only kicks in for a stalled bootstrap, where it
 * periodically prints (and re-buffers) whatever has accumulated so far via the logger below, so problems like a
 * stuck database connection surface promptly instead of only once `NestFactory.create` finally settles.
 */
const LOG_BUFFER_FLUSH_INTERVAL_MS = 10_000;

const main = async () => {
  /**
   * If REDACT_LOGS is true use ConsoleLoggerWithRedact. ConsoleLoggerWithRedact is used just if `NestFactory.create` fails completely,
   * or periodically while it's still starting up (see `logBufferFlushInterval` below).
   * If `NestFactory.create` doesn't fail completely, then buffered logs are passed to PinoLogger. NestLogger and ConsoleLoggerWithRedact are not used.
   */
  const logger = process.env.REDACT_LOGS !== 'false' ? new ConsoleLoggerWithRedact(REDACT_STRINGS) : new NestLogger();

  const logBufferFlushInterval = setInterval(() => {
    NestLogger.flush();
    NestLogger.attachBuffer();
  }, LOG_BUFFER_FLUSH_INTERVAL_MS);

  try {
    const nestApp: NestApplication = await NestFactory.create(MainModule, { logger, bufferLogs: true });
    const app = new App(nestApp);

    logger.log(`==========================================================`);
    logger.log(`Main app will serve on PORT ${app.port}`, 'MainApplication');
    logger.log(`==========================================================`);

    await app.listen();
  } catch (error) {
    logger.error('❌ An error was encountered %o', error instanceof Error ? error.stack : String(error));
  } finally {
    clearInterval(logBufferFlushInterval);
  }
};

main();
