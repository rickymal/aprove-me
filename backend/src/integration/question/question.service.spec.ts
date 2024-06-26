import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { PrismaService } from '@database/prisma.service';

describe('QuestionService', () => {
  let questionService: QuestionService;

  const mockedPrismaService = {
    question: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: PrismaService,
          useValue: mockedPrismaService,
        },
      ],
    }).compile();

    questionService = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(questionService).toBeDefined();
  });

  it("should be capable of loading all test name's", async () => {
    const expected = { test: 123 };
    mockedPrismaService.question.findMany.mockResolvedValue(expected);
    const result = await questionService.findAll();
    expect(result).toBe(expected);
  });
});
