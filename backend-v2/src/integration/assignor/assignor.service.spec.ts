import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { CreateAssignorDto } from './dto/create-assignor.dto';
import { DatabaseModule } from '@database/database.module';
import { PrismaService } from '@database/prisma.service';

describe('AssignorService', () => {
  let service: AssignorService;
  const mockerPrismaService = {
    assignor: {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [AssignorService],
    }).overrideProvider(PrismaService).useValue(mockerPrismaService).compile();

    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a new assignor', async() => {
    const createAssignorDto : CreateAssignorDto = {
      name: "test",
      document: "12345678901",
      email: "<EMAIL>",
      phone: "12345678901",
    }

    mockerPrismaService.assignor.create.mockResolvedValue({
      "id": "84795e0c-f551-4cee-8640-a264366cfa8d",
      "name": "João Silva",
      "document": "123.456.789-00",
      "email": "joao.silva@example.com",
      "phone": "+55 11 99999-9999"
    })

    const resp = await service.create(createAssignorDto)

    expect(resp).toEqual({
      "id": "84795e0c-f551-4cee-8640-a264366cfa8d",
      "name": "João Silva",
      "document": "123.456.789-00",
      "email": "joao.silva@example.com",
      "phone": "+55 11 99999-9999"
    })
  })
});
