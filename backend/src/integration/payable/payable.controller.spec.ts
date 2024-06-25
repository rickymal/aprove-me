import { Test, TestingModule } from '@nestjs/testing';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { PrismaService } from '@database/prisma.service';
import { SessionManagerService } from '@auth/session/session-manager.service';
import { RedisService } from '@database/redis/redis.service';
import { RabbitMqFactoryService } from '@queue/rabbit-mq.service';

describe('PayableController', () => {
  let controller: PayableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [PayableService, PrismaService, SessionManagerService, {provide: RedisService, useValue: {}}, {provide: RabbitMqFactoryService, useValue: {}}],
    }).compile();

    controller = module.get<PayableController>(PayableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
