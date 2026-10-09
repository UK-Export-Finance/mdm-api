import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';

dotenv.config();

export const DocConfig = registerAs(
  'doc',
  (): Record<string, any> => ({
    name: process.env.DOC_NAME || 'MDM API Specification',
    description: 'MDM API documentation',
    version: process.env.DOC_VERSION || '1.0',
    prefix: '/docs',
  }),
);
