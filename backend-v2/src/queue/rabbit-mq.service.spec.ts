import { Test, TestingModule } from '@nestjs/testing';

import * as amqp from 'amqp-connection-manager';
import { CreatePayableDto } from '@integration/payable/dto/create-payable.dto';
import { RabbitMqConsumer, RabbitMqFactoryService, RabbitMqProducer } from './rabbit-mq.service';

jest.mock('amqp-connection-manager');

describe('RabbitMqFactoryService', () => {
  let service: RabbitMqFactoryService;
  let mockConnection: amqp.AmqpConnectionManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMqFactoryService],
    }).compile();

    service = module.get<RabbitMqFactoryService>(RabbitMqFactoryService);

    mockConnection = {
      createChannel: jest.fn().mockReturnValue({
        addSetup: jest.fn(),
        sendToQueue: jest.fn(),
        ack: jest.fn(),
        nack: jest.fn(),
        consume: jest.fn(),
      }),
      close: jest.fn(),
    } as any;

    (amqp.connect as jest.Mock).mockReturnValue(mockConnection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a producer', async () => {
    await service.onModuleInit();
    const producer = service.createProducer<CreatePayableDto>('test-queue');
    expect(producer).toBeInstanceOf(RabbitMqProducer);
  });

  it('should create a consumer', async () => {
    await service.onModuleInit();
    const consumer = service.createConsumer<CreatePayableDto>({
      retries: 3,
      interval: 1000,
      queueName: 'test-queue',
      consumerTag: 'test-consumer',
      noAck: false,
      prefetchCount: 1,
      noLocal: false,
      exclusive: false,
    });
    expect(consumer).toBeInstanceOf(RabbitMqConsumer);
  });

  it('should close the connection on module destroy', async () => {
    await service.onModuleInit();
    await service.onModuleDestroy();
    expect(mockConnection.close).toHaveBeenCalled();
  });
});
