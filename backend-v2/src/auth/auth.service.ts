import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { createHmac, randomBytes, pbkdf2Sync } from 'crypto';
import { SessionManagerService } from './session/session-manager.service';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {

    const user = this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password
      }
    })
    return user
  }

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email : email } });
  }
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionManager: SessionManagerService,
  ) {}

  async register(email: string, password: string): Promise<{ id: string, email: string, token: string }> {
    let user: User | null = await this.userRepository.findOneByEmail(email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = randomBytes(16).toString('hex');
    const hashedPassword = this.hashPassword(password + '#AproveMe', salt);
    user = await this.userRepository.create({ email, password: `${salt}:${hashedPassword}` });
    const token = await this.sessionManager.createSession(user);
    return { id: user.id, email: user.email, token };
  }

  async authenticate(email: string, password: string): Promise<{ id: string, email: string, token: string }> {
    const user: User | null = await this.userRepository.findOneByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const [salt, storedHash] = user.password.split(':');
    const hashedPassword = this.hashPassword(password + '#AproveMe', salt);
    if (hashedPassword !== storedHash) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.sessionManager.createSession(user);
    return { id: user.id, email: user.email, token };
  }

  private hashPassword(password: string, salt: string): string {
    const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash;
  }
}