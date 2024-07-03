import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PrismaService } from '@database/prisma.service';
import { DatabaseModule } from '@database/database.module';
import { SessionModule } from '@auth/session/session-manager.module';
import { MailerConfigModule } from '@email/mailer.module';
import { BrokerModule } from '@queue/broker.module';
import { PayableController } from './payable.controller';
import { PayableConsumerService } from './payable-consumer/payable-consumer.service';
import { CreatePayableDto } from './dto/create-payable.dto';

describe('PayableService', () => {
  let service: PayableService;
  let prisma: PrismaService;

  const mockedPrisma = {
    payable: {
      create: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        BrokerModule,
        MailerConfigModule,
        SessionModule,
      ],
      controllers: [PayableController],
      providers: [PayableService, PayableConsumerService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockedPrisma)
      .compile();

    service = module.get<PayableService>(PayableService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('creation', () => {
    it('should create a new payable', async () => {
      const createPayableDto: CreatePayableDto = {
        amount: 332500.3,
        emissionDate: '2023-04-24T18:30:00.000Z',
        assignor: {
          connect: {
            id: '84795e0c-f551-4cee-8640-a264366cfa8d',
          },
        },
      };

      const expectedResponse = {
        id: '84795e0c-f551-4cee-8640-a264366cfa8d',
        amount: createPayableDto.amount,
        emissionDate: createPayableDto.emissionDate,
        assignorId: createPayableDto.assignor.connect.id,
      };

      mockedPrisma.payable.create.mockResolvedValue(expectedResponse);

      const response = await service.create(createPayableDto);

      expect(mockedPrisma.payable.create).toHaveBeenCalledTimes(1);
      expect(response).toEqual(expectedResponse);
    });

    it('should throw an error when creation fails', async () => {
      const createPayableDto: CreatePayableDto = {
        amount: 332500.3,
        emissionDate: '2023-04-24T18:30:00.000Z',
        assignor: {
          connect: {
            id: '84795e0c-f551-4cee-8640-a264366cfa8d',
          },
        },
      };

      mockedPrisma.payable.create.mockRejectedValue(
        new Error('Error creating payable'),
      );

      await expect(service.create(createPayableDto)).rejects.toThrow(
        'Error creating payable',
      );
    });
  });
});
