import { Test, TestingModule } from '@nestjs/testing';
import { PayableConsumerService } from './payable-consumer.service';
import { SessionModule } from '@auth/session/session-manager.module';
import { DatabaseModule } from '@database/database.module';
import { MailerConfigModule } from '@email/mailer.module';
import { BrokerModule } from '@queue/broker.module';
import { PayableModule } from '../payable.module';
import { PayableService } from '../payable.service';
import { RabbitMqFactoryService } from '@queue/rabbit-mq.service';
import { CreatePayableDto } from '../dto/create-payable.dto';

describe('PayableConsumerService', () => {
  let service: PayableConsumerService;
  let rabbitMqFactoryService: RabbitMqFactoryService;

  const mockedRabbitMqService = {
    createConsumer: jest.fn(),
    createProducer: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        BrokerModule,
        MailerConfigModule,
        SessionModule,
        PayableModule,
      ],
      providers: [PayableConsumerService, PayableService],
    })
      .overrideProvider(RabbitMqFactoryService)
      .useValue(mockedRabbitMqService)
      .compile();

    service = module.get<PayableConsumerService>(PayableConsumerService);
    rabbitMqFactoryService = module.get<RabbitMqFactoryService>(
      RabbitMqFactoryService,
    );

    mockedRabbitMqService.createConsumer.mockReturnValue({
      addPayableListener: jest.fn(),
    });

    mockedRabbitMqService.createProducer.mockReturnValue({
      addToQueue: jest.fn(),
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize', async () => {
    await service.onModuleInit();

    expect(mockedRabbitMqService.createConsumer).toHaveBeenCalledTimes(1);
    expect(mockedRabbitMqService.createProducer).toHaveBeenCalledTimes(1);
    expect(mockedRabbitMqService.createProducer).toHaveBeenCalledWith(
      'payables-death',
    );
  });
});
