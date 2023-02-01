import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('database.redis.host'),
        port: configService.get<string>('database.redis.port'),
        username: configService.get<string>('database.redis.username'),
        password: configService.get<string>('database.redis.password'),
        no_ready_check: true,
      }),
    })
  ],
  exports: [CacheModule],
  providers: []
})
export class RedisCacheModule {}
