import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { RedisService } from '@database/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';

interface Session {
  user: User;
  expiry: number;
}

@Injectable()
export class SessionManagerService {
  private expiryDuration: number;

  constructor(private readonly redisService: RedisService) {
    const expiryMinutes = parseInt(process.env.SESSION_EXPIRY_MINUTES || '60');
    this.expiryDuration = expiryMinutes * 60 * 1000;
  }

  async createSession(user: User): Promise<string> {
    const token = uuidv4();
    const expiry = Date.now() + this.expiryDuration;
    const session: Session = { user, expiry };
    await this.redisService.set(
      token,
      JSON.stringify(session),
      this.expiryDuration / 1000,
    );
    return token;
  }

  async getAllSessions(): Promise<number> {
    const keys = await this.redisService.keys('*');
    return keys.length;
  }

  async getSession(token: string): Promise<User | null> {
    const sessionData = await this.redisService.get(token);
    if (!sessionData) {
      return null;
    }

    const session: Session = JSON.parse(sessionData);
    if (session.expiry < Date.now()) {
      await this.redisService.del(token);
      return null;
    }

    return session.user;
  }

  async removeSession(token: string): Promise<void> {
    await this.redisService.del(token);
  }
}
