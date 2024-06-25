import { Test, TestingModule } from "@nestjs/testing";
import { TestQuestionController } from "./test-question.controller";
import { TestQuestionService } from "./test-question.service";
import { PrismaService } from "@database/prisma.service";




describe('TestQuestionController', () => {
  let testQuestionController : TestQuestionController;
  const mockedPrismaService = {
    test: {
      findMany: jest.fn(),
    },
  }

  it('should be defined', () => {
    expect(TestQuestionController).toBeDefined();
  }); 


  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestQuestionController],
      providers: [TestQuestionService,{
        provide: PrismaService,
        useValue: mockedPrismaService,
      }],
    }).compile();
    
    testQuestionController = module.get(TestQuestionController);
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all tests', async () => {
    const response = [
      {
        id: '1',
        name: "Teste 1",
      },
      {
        id: '2',
        name: "Teste 2",
      },
      {
        id: '3',
        name: "Teste 3",
      },
    ];
    jest.spyOn(testQuestionController, 'findAllNames').mockResolvedValue(response);
    const result = await testQuestionController.findAllNames();
    expect(result).toEqual(response);
    expect(testQuestionController.findAllNames).toHaveBeenCalledTimes(1);
  })
  it('should return no test found if no test was found', async () => {
    const response = [];
    jest.spyOn(testQuestionController, 'findAllNames').mockResolvedValue(response);
    const result = await testQuestionController.findAllNames();
    expect(result).toEqual(response);
    expect(testQuestionController.findAllNames).toHaveBeenCalledTimes(1);
  })
})