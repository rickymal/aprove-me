import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisModule } from './redis/redis.module';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [RedisModule],
})
export class DatabaseModule {}
