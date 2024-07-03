import { Injectable, Logger } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '@database/prisma.service';

@Injectable()
export class QuestionService {
  prismaService: PrismaService;
  private readonly logger = new Logger(QuestionService.name);

  constructor(prisma: PrismaService) {
    this.prismaService = prisma;
  }
  create(createQuestionDto: CreateQuestionDto) {
    return this.prismaService.question.create({
      data: createQuestionDto,
    });
  }

  findAll() {
    return this.prismaService.question.findMany();
  }

  async findByTestId(testId: string) {
    const questions = await this.prismaService.question.findMany({
      where: {test_id: testId}
    })
    this.logger.log("Teste")
    
    

    const questionsWithAnswers = await Promise.all(questions.map(async (question) => {
      const answers = await this.prismaService.questionAnswer.findMany({
        where: { question_id: question.id }
      })
      return { question, answers }
    }))
    return questionsWithAnswers
  }

  findOne(id: string) {
    return this.prismaService.question.findUnique({
      where: { id: id },
    });
  }

  update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return this.prismaService.question.update({
      where: { id: id },
      data: updateQuestionDto,
    });
  }

  remove(id: string) {
    return this.prismaService.question.delete({
      where: { id: id },
    });
  }
}
