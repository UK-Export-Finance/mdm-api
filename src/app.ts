import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiKeyAuthGuard } from '@ukef/auth/guard/api-key.guard';
import { TransformInterceptor } from '@ukef/helpers';
import { SwaggerDocs } from '@ukef/swagger';
import compression from 'compression';
import { Logger } from 'nestjs-pino';

export class App {
  private readonly configService: ConfigService;
  public readonly port: number;

  constructor(protected readonly app: INestApplication) {
    this.configService = app.get<ConfigService>(ConfigService);
    this.port = this.getConfig<number>('PORT') || 3003;

    const env: string = this.getConfig<string>('app.env');
    process.env.NODE_ENV = env;

    const globalPrefix: string = this.getConfig<string>('app.globalPrefix');
    const version: string = this.getConfig<string>('app.versioning.version');
    const versioningPrefix: string = this.getConfig<string>('app.versioning.prefix');
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versioningPrefix,
    });

    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    // Swagger docs
    SwaggerDocs(app);

    app.useLogger(app.get(Logger));
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalGuards(new ApiKeyAuthGuard());

    app.use(
      compression({
        filter: (req, res) => {
          if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false;
          }

          // fallback to standard filter function
          return compression.filter(req, res);
        },
      }),
    );
  }

  private getConfig<T = any>(key: string): T {
    return this.configService.get<T>(key);
  }

  listen(): Promise<void> {
    return this.app.listen(this.port);
  }
}
