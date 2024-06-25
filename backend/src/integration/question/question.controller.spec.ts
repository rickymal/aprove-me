import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { PrismaService } from '@database/prisma.service';

describe('QuestionController', () => {
  let controller: QuestionController;
  let mockedPrismaService = {
    question: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [QuestionService, {provide: PrismaService, useValue: mockedPrismaService}],
      // providers: [
      //   {
      //     provide: QuestionService,
      //     useValue: {
      //       findAll: () => [],
      //       findOne: () => ({
      //         id: '1',
      //         name: 'Teste 1',
      //         description: 'Descrição do teste 1',
      //         test_id: '1',
      //       })
      //     }
      //   }
      // ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
  it.todo('should select the test and return the questions')
  it("should return null if 'id' selected was not found", async () => {
    // Property 'catch' does not exist on type 'Mock<any, any, any>'.ts(2339)

    mockedPrismaService.question.findMany.mockResolvedValue(null)
    expect(await controller.findAllByTestId('1')).toBeNull()


    // expect(async () => controller.findAllByTestId('1')).rejects.toThrow(expect.objectContaining({ status: 404 }));
  })
});
