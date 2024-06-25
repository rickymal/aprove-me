import { Test, TestingModule } from '@nestjs/testing';

import { PrismaService } from '@database/prisma.service';
import { TestQuestionService } from './test-question.service';


describe('TestQuestionService', () => {
  let testQuestionService: TestQuestionService;

  const mockedPrismaService = {
    test: {
      findMany: jest.fn(),
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestQuestionService, {
        provide: PrismaService,
        useValue: mockedPrismaService,
      }],
    }).compile();

    testQuestionService = module.get<TestQuestionService>(TestQuestionService);
  });

  describe('findAll', () => {

    beforeEach(() => {
      /**
       * Clears the mock implementation of the `findMany` method on the `test` property of the `mockedPrismaService` object.
       * This is typically used in test setup or teardown to reset the mock behavior before each test case.
       */
      mockedPrismaService.test.findMany.mockClear();
    })

    it('should return all tests', async () => {
      const response = [
        {
          id: 1,
          name: 'Test 1',
          questions: [
            {
              id: 1,
              question: 'Question 1',
              answers: [
                {
                  id: 1,
                  answer: 'Answer 1',
                },
              ],
            },
          ],
        },
      ];

      mockedPrismaService.test.findMany.mockResolvedValue(response);

      const tests = await testQuestionService.findAll();
      
      expect(tests).toEqual(response);
      expect(mockedPrismaService.test.findMany).toHaveBeenCalledTimes(1);
    });
    
    it('should return an empty array when no tests are found', async () => {
      mockedPrismaService.test.findMany.mockResolvedValue([]);
      const tests = await testQuestionService.findAll();
      expect(mockedPrismaService.test.findMany).toHaveBeenCalledTimes(1);
      expect(tests).toEqual([]);
    });
  });
});
