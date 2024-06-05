import { Module } from '@nestjs/common';
import { SessionManagerService } from './session-manager.service';
import { RedisService } from 'src/database/redis/redis.service';

@Module({
  imports: [],
  providers: [SessionManagerService, RedisService],
  exports: [SessionManagerService],
})
export class SessionModule {}
