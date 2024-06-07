import { Module } from '@nestjs/common';
import { AuthService, UserRepository } from './auth.service';
import { AuthController } from './auth.controller';

// import { SessionManagerService } from './session-manager.service';
import { AuthGuard } from './auth.guard';
import { SessionModule } from './session/session-manager.module';
import { PrismaService } from '@database/prisma.service';

@Module({
  imports: [SessionModule],
  providers: [AuthService, UserRepository, PrismaService, AuthGuard],
  controllers: [AuthController],
  // exports: [PrismaService]
  // exports: [SessionManagerService]
})
export class AuthModule {}
