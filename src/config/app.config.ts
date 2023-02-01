import { registerAs } from '@nestjs/config';
import { version } from 'package.json';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    name: process.env.APP_NAME || 'mdm',
    env: process.env.APP_ENV || 'development',

    repoVersion: version,
    versioning: {
      enable: process.env.HTTP_VERSIONING_ENABLE === 'true' || false,
      prefix: 'v',
      version: process.env.HTTP_VERSION || '1',
    },

    globalPrefix: '/api',
    port: process.env.HTTP_PORT ? Number.parseInt(process.env.HTTP_PORT, 10) : 3003,
  }),
);
