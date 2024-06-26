import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;
  private readonly logger = new Logger(RedisService.name);
  private maxAttempts: number = 5;
  private delay: number = 5000; // 1 second

  async onModuleInit() {
    this.logger.log('Initializing Redis client...');
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis Client Error', err);
    });

    // await this.connectWithRetry();
  }

  private async connectWithRetry(): Promise<void> {
    for (let i = 0; i < this.maxAttempts; i++) {
      try {
        this.logger.log(`Attempt ${i + 1} to connect to Redis...`);
        await this.client.connect();
        this.logger.log('Connected to Redis');
        return;
      } catch (err) {
        this.logger.error(`Attempt ${i + 1} to connect to Redis failed`, err);
        if (i < this.maxAttempts - 1) {
          const delayTime = this.delay * (i + 1); // Aumenta o atraso progressivamente
          this.logger.log(`Waiting for ${delayTime}ms before retrying...`);
          await new Promise((resolve) => setTimeout(resolve, delayTime));
        }
      }
    }
    this.logger.error('All attempts to connect to Redis failed');
    // Tome uma ação apropriada aqui, como lançar uma exceção ou encerrar o aplicativo
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting Redis client...');
    await this.client.disconnect();
  }

  async set(key: string, value: string, expiry?: number): Promise<void> {
    this.logger.log(`Setting key ${key} in Redis`);
    if (expiry) {
      await this.client.set(key, value, { EX: expiry });
    } else {
      await this.client.set(key, value);
    }
  }

  async get(key: string): Promise<string | null> {
    this.logger.log(`Getting key ${key} from Redis`);
    return this.client.get(key);
  }

  async del(key: string): Promise<void> {
    this.logger.log(`Deleting key ${key} from Redis`);
    await this.client.del(key);
  }

  async keys(pattern: string): Promise<string[]> {
    this.logger.log(`Getting keys with pattern ${pattern} from Redis`);
    return this.client.keys(pattern);
  }
}
